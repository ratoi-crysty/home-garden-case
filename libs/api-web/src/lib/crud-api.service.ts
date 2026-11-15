import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_API_PATH } from './api.const';

@Injectable({
  providedIn: 'root',
})
export abstract class CrudApiService<T, TC, TU, K extends string | number> {
  protected readonly apiPath = inject(BASE_API_PATH);
  protected readonly basePath = 'gardens';
  protected readonly http = inject(HttpClient);

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.buildUrl());
  }

  getById(id: K): Observable<T> {
    return this.http.get<T>(this.buildUrl(id.toString()));
  }

  create(details: TC): Observable<T> {
    return this.http.post<T>(this.buildUrl(), details);
  }

  update(id: K, details: TU): Observable<T> {
    return this.http.put<T>(this.buildUrl(id.toString()), details);
  }

  remove(id: K): Observable<undefined> {
    return this.http.delete<undefined>(this.buildUrl(id.toString()));
  }

  protected buildUrl(path = ''): string {
    const baseUrl = `${this.stripSlashes(this.apiPath)}/${this.stripSlashes(this.basePath)}`;

    return path ? `${baseUrl}/${path}` : baseUrl;
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
