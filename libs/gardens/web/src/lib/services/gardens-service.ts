import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateGardenRequest,
  GardenModel,
  UpdateGardenRequest,
} from '@itp-home-garden/gardens-types';

@Injectable({
  providedIn: 'root',
})
export class GardensService {
  // TODO: Implement a common token for the base API
  protected readonly baseUrl = '/api/gardens';
  protected readonly http = inject(HttpClient);

  getAll(): Observable<GardenModel[]> {
    return this.http.get<GardenModel[]>(this.buildUrl());
  }

  getById(id: number): Observable<GardenModel> {
    return this.http.get<GardenModel>(this.buildUrl(id.toString()));
  }

  create(details: CreateGardenRequest): Observable<GardenModel> {
    return this.http.post<GardenModel>(this.buildUrl(), details);
  }

  update(details: UpdateGardenRequest): Observable<GardenModel> {
    return this.http.post<GardenModel>(this.buildUrl(), details);
  }

  protected buildUrl(path = ''): string {
    return path ? `${this.baseUrl}/${path}` : this.baseUrl;
  }
}
