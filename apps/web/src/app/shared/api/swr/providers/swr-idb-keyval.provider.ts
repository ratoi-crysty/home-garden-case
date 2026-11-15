import { ApiSwrProvider, SwrEntry } from '../api-swr.types';
import { from, Observable } from 'rxjs';
import { set, get, del } from 'idb-keyval';

export class SwrIdbKeyvalProvider implements ApiSwrProvider {
  get<T>(path: string): Observable<SwrEntry<T> | undefined> {
    return from(get<SwrEntry<T>>(path));
  }

  remove(path: string): Observable<void> {
    return from(del(path));
  }

  set<T>(path: string, result: SwrEntry<T>): Observable<void> {
    return from(set(path, result));
  }
}
