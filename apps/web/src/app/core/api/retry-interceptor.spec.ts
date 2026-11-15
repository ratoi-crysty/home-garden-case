import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
  TestRequest,
} from '@angular/common/http/testing';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { defer, Observable, throwError } from 'rxjs';
import { Mock } from 'vitest';
import { LoggerService } from '../../shared/log/logger.service';
import { RETRY_COUNT, retryInterceptor } from './retry-interceptor';

interface LoggerMock {
  warn: Mock;
}

interface RequestResult {
  value?: unknown;
  error?: unknown;
}

type HttpMethod = 'GET' | 'PUT' | 'DELETE' | 'POST' | 'PATCH';

const URL = '/api/resource';

describe('retryInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let logger: LoggerMock;

  function setup(retryCount?: number): void {
    logger = { warn: vi.fn() };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([retryInterceptor])),
        provideHttpClientTesting(),
        { provide: LoggerService, useValue: logger },
        ...(retryCount === undefined ? [] : [{ provide: RETRY_COUNT, useValue: retryCount }]),
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  }

  function send(method: HttpMethod): RequestResult {
    const result: RequestResult = {};

    http
      .request(method, URL, { body: method === 'GET' || method === 'DELETE' ? undefined : {} })
      .subscribe({
        next: (value: unknown): void => {
          result.value = value;
        },
        error: (error: unknown): void => {
          result.error = error;
        },
      });

    return result;
  }

  function failWith(status: number): void {
    const req: TestRequest = httpMock.expectOne(URL);
    req.flush('error', { status, statusText: 'Error' });
  }

  afterEach(() => {
    httpMock.verify();
  });

  describe('retryable methods', () => {
    beforeEach(() => setup());

    it.each<HttpMethod>(['GET', 'PUT', 'DELETE'])(
      'retries %s requests on a transient error and emits the successful response',
      fakeAsync((method: HttpMethod): void => {
        const result: RequestResult = send(method);

        failWith(503);
        tick(1000);

        const req: TestRequest = httpMock.expectOne(URL);
        expect(req.request.method).toBe(method);
        req.flush({ ok: true });

        expect(result.value).toEqual({ ok: true });
        expect(result.error).toBeUndefined();
        expect(logger.warn).not.toHaveBeenCalled();
      }),
    );

    it.each<number>([500, 502, 503, 504, 408])(
      'treats status %i as transient',
      fakeAsync((status: number): void => {
        const result: RequestResult = send('GET');

        failWith(status);
        tick(1000);
        httpMock.expectOne(URL).flush({ ok: true });

        expect(result.value).toEqual({ ok: true });
      }),
    );

    it('backs off linearly (1s, 2s, 3s) between attempts', fakeAsync((): void => {
      send('GET');

      failWith(500);
      tick(999);
      httpMock.expectNone(URL);
      tick(1);

      failWith(500);
      tick(1999);
      httpMock.expectNone(URL);
      tick(1);

      failWith(500);
      tick(2999);
      httpMock.expectNone(URL);
      tick(1);

      httpMock.expectOne(URL).flush({ ok: true });
    }));

    it('gives up after the default 3 retries, logs a warning and rethrows the last error', fakeAsync((): void => {
      const result: RequestResult = send('GET');

      failWith(500);
      tick(1000);
      failWith(500);
      tick(2000);
      failWith(500);
      tick(3000);
      failWith(504);

      tick(10000);
      httpMock.expectNone(URL);

      expect(result.error).toBeInstanceOf(HttpErrorResponse);
      expect((result.error as HttpErrorResponse).status).toBe(504);
      expect(logger.warn).toHaveBeenCalledTimes(1);
      expect(logger.warn).toHaveBeenCalledWith(
        'Failed request',
        { url: URL, err: result.error },
        'RetryInterceptor',
      );
    }));

    it.each<number>([400, 401, 403, 404, 409, 422])(
      'does not retry on non-transient status %i',
      fakeAsync((status: number): void => {
        const result: RequestResult = send('GET');

        failWith(status);
        tick(10000);
        httpMock.expectNone(URL);

        expect((result.error as HttpErrorResponse).status).toBe(status);
        expect(logger.warn).toHaveBeenCalledTimes(1);
      }),
    );

    it('does not retry on network errors (status 0)', fakeAsync((): void => {
      const result: RequestResult = send('GET');

      httpMock.expectOne(URL).error(new ProgressEvent('error'));
      tick(10000);
      httpMock.expectNone(URL);

      expect((result.error as HttpErrorResponse).status).toBe(0);
      expect(logger.warn).toHaveBeenCalledTimes(1);
    }));

    it('stops retrying as soon as a non-transient error occurs', fakeAsync((): void => {
      const result: RequestResult = send('GET');

      failWith(500);
      tick(1000);
      failWith(404);
      tick(10000);
      httpMock.expectNone(URL);

      expect((result.error as HttpErrorResponse).status).toBe(404);
      expect(logger.warn).toHaveBeenCalledTimes(1);
    }));

    it('does not log on success', (): void => {
      const result: RequestResult = send('GET');

      httpMock.expectOne(URL).flush({ ok: true });

      expect(result.value).toEqual({ ok: true });
      expect(logger.warn).not.toHaveBeenCalled();
    });
  });

  describe('non-retryable methods', () => {
    beforeEach(() => setup());

    it.each<HttpMethod>(['POST', 'PATCH'])(
      'passes %s errors through without retrying or logging',
      fakeAsync((method: HttpMethod): void => {
        const result: RequestResult = send(method);

        failWith(503);
        tick(10000);
        httpMock.expectNone(URL);

        expect((result.error as HttpErrorResponse).status).toBe(503);
        expect(logger.warn).not.toHaveBeenCalled();
      }),
    );
  });

  describe('RETRY_COUNT', () => {
    it('respects a custom retry count', fakeAsync((): void => {
      setup(1);
      const result: RequestResult = send('GET');

      failWith(500);
      tick(1000);
      failWith(500);
      tick(10000);
      httpMock.expectNone(URL);

      expect((result.error as HttpErrorResponse).status).toBe(500);
      expect(logger.warn).toHaveBeenCalledTimes(1);
    }));

    it('does not retry when the retry count is 0', fakeAsync((): void => {
      setup(0);
      const result: RequestResult = send('GET');

      failWith(500);
      tick(10000);
      httpMock.expectNone(URL);

      expect((result.error as HttpErrorResponse).status).toBe(500);
      expect(logger.warn).toHaveBeenCalledTimes(1);
    }));
  });

  describe('non-HTTP errors', () => {
    beforeEach(() => setup());

    it('does not retry errors that are not HttpErrorResponse instances', fakeAsync((): void => {
      const error: Error = new Error('boom');
      let subscriptions = 0;
      // retry() resubscribes to the source rather than calling next() again, so count subscriptions.
      const next: HttpHandlerFn = (): Observable<HttpEvent<unknown>> =>
        defer((): Observable<HttpEvent<unknown>> => {
          subscriptions++;

          return throwError(() => error);
        });
      const req: HttpRequest<unknown> = new HttpRequest<unknown>('GET', URL);
      const result: RequestResult = {};

      runInInjectionContext(TestBed.inject(EnvironmentInjector), (): void => {
        retryInterceptor(req, next).subscribe({
          error: (err: unknown): void => {
            result.error = err;
          },
        });
      });
      tick(10000);

      expect(subscriptions).toBe(1);
      expect(result.error).toBe(error);
      expect(logger.warn).toHaveBeenCalledWith(
        'Failed request',
        { url: URL, err: error },
        'RetryInterceptor',
      );
    }));
  });
});
