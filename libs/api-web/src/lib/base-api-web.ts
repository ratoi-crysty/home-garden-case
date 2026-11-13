import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseApiWeb<K extends string, T extends Record<K, number | string>> {
  protected abstract readonly baseUrl: string;
  protected abstract readonly idKey: K;
  protected readonly http = inject(HttpClient);

  getAll(options: Parameters<HttpClient['get']>[1]): Observable<T[]> {
    return this.http.get<T[]>(this.buildUrl(), options);
  }

  getById(id: T[K], options: Parameters<HttpClient['get']>[1]): Observable<T> {
    return this.http.get<T>(this.buildUrl(id.toString()), options);
  }

  protected buildUrl(path = ''): string {
    return path ? `${this.stripSlashes(this.baseUrl)}/${this.stripSlashes(path)}` : this.baseUrl;
  }

  protected stripSlashes(path: string): string {
    let output = path;

    if (output.startsWith('/')) {
      output = output.substring(1);
    }
    if (output.endsWith('/')) {
      output = output.substring(0, output.length - 1);
    }

    return output;
  }
}
