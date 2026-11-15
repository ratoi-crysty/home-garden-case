import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, filter, Observable, switchMap, tap } from 'rxjs';
import { ApiSwrService } from '../swr/api-swr.service';
import { SwrCacheDuration, SwrEntry } from '../swr/api-swr.types';
import { LoggerService } from '../../log/logger.service';

@Injectable()
export abstract class ApiStoreService<T, R> {
  protected abstract readonly name: string;
  protected readonly data = new BehaviorSubject<T | undefined>(undefined);
  protected readonly apiSwr = inject(ApiSwrService);
  protected readonly logger = inject(LoggerService);

  getData(): Observable<T> {
    return this.data.pipe(filter((data: T | undefined): data is T => !!data));
  }

  load(req: R): void {
    this.apiSwr
      .get<T>(this.getCacheKey(req))
      .pipe(
        switchMap((entry: SwrEntry<T> | undefined): Observable<void> => {
          if (entry) {
            this.data.next(entry.data);

            if (new Date(entry.freshUntil).getTime() > Date.now()) {
              return EMPTY;
            }
          }

          return this.refreshData(req).pipe(
            catchError((err) => {
              this.logger.error('Failed to fetch cache', err);

              if (entry) {
                // TODO: Display toastr warning
              } else {
                this.data.error(err);
              }

              return EMPTY;
            }),
          );
        }),
      )
      .subscribe();
  }

  refreshData(req: R): Observable<void> {
    return this.fetchData(req).pipe(
      tap((data: T) => this.data.next(data)),
      switchMap((data) => {
        return this.apiSwr.set<T>(this.getCacheKey(req), {
          ...this.getCacheDuration(req),
          data,
        });
      }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected getCacheDuration(_: R): SwrCacheDuration {
    return {
      freshFor: 30_000,
      maxStaleFor: 60_000 * 5,
    };
  }

  protected abstract getCacheKey(req: R): string;
  protected abstract fetchData(req: R): Observable<T>;
}
