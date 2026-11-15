import { Observable } from 'rxjs';

export interface SwrCacheDuration {
  freshFor: number;
  maxStaleFor: number;
}

export interface SwrCacheDetails<T> extends SwrCacheDuration {
  data: T;
}

export interface SwrEntry<T> {
  data: T;
  freshUntil: string;
  maxStaleUntil: string;
}

export interface ApiSwrProvider {
  get<T>(path: string): Observable<SwrEntry<T> | undefined>;
  set<T>(path: string, result: SwrEntry<T>): Observable<void>;
  remove(path: string): Observable<void>;
}
