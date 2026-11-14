import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_API_PATH } from './api-web.const';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseApiWeb<T, TC, TU, K extends string | number> {
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

  update(details: TU): Observable<T> {
    return this.http.post<T>(this.buildUrl(), details);
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
