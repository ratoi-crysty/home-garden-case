import { inject, Injectable, InjectionToken } from '@angular/core';
import { concatMap, Observable, of } from 'rxjs';
import { ApiSwrProvider, SwrCacheDetails, SwrEntry } from './api-swr.types';
import { SwrIdbKeyvalProvider } from './providers/swr-idb-keyval.provider';

export const API_SWP_PROVIDER = new InjectionToken<ApiSwrProvider>('api-swr.provider', {
  providedIn: 'root',
  factory: () => new SwrIdbKeyvalProvider(),
});

@Injectable({
  providedIn: 'root',
})
export class ApiSwrService {
  protected readonly provider = inject(API_SWP_PROVIDER);

  get<T>(path: string): Observable<SwrEntry<T> | undefined> {
    return this.provider.get<T>(path).pipe(
      concatMap((entry: SwrEntry<T> | undefined): Observable<SwrEntry<T> | undefined> => {
        if (!entry) {
          return of(undefined);
        }

        if (new Date(entry.maxStaleUntil).getTime() < Date.now()) {
          return this.remove(path) as Observable<undefined>;
        }

        return of(entry);
      }),
    );
  }
  set<T>(path: string, details: SwrCacheDetails<T>): Observable<void> {
    return this.provider.set(path, {
      data: details.data,
      freshUntil: new Date(Date.now() + details.freshFor).toISOString(),
      maxStaleUntil: new Date(Date.now() + details.maxStaleFor).toISOString(),
    });
  }
  remove(path: string): Observable<void> {
    return this.provider.remove(path);
  }
}
