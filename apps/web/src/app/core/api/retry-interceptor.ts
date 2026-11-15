import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable, retry, throwError, timer } from 'rxjs';
import { inject, InjectionToken } from '@angular/core';
import { LoggerService } from '../../shared/log/logger.service';

export const RETRY_COUNT = new InjectionToken<number>('retry-interceptor.retry-count', {
  providedIn: 'root',
  factory: (): number => 3,
});

function isTransientError(err: HttpErrorResponse) {
  return err.status >= 500 || err.status === 408;
}

export function retryInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  if (!['GET', 'PUT', 'DELETE'].includes(req.method)) {
    return next(req);
  }

  const logger: LoggerService = inject(LoggerService);
  const count: number = inject(RETRY_COUNT);

  return next(req).pipe(
    retry({
      count,
      delay: (err, attempt: number): Observable<unknown> => {
        if (!(err instanceof HttpErrorResponse) || !isTransientError(err)) {
          return throwError(() => err);
        }

        return timer(attempt * 1000);
      },
    }),
    catchError((err) => {
      logger.warn('Failed request', { url: req.url, err }, 'RetryInterceptor');

      return throwError(() => err);
    }),
  );
}
