import { Injectable } from '@angular/core';
import {
  CreateGardenRequest,
  GardenModel,
  UpdateGardenRequest,
} from '@itp-home-garden/api-interfaces';
import { CrudApiService } from '../../../shared/api/crud/crud-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GardenApiService extends CrudApiService<
  GardenModel,
  CreateGardenRequest,
  UpdateGardenRequest,
  number
> {
  protected override readonly basePath = 'gardens';

  getAll(): Observable<GardenModel[]> {
    return this.http.get<GardenModel[]>(this.getAllUrl());
  }

  getAllUrl() {
    return this.buildUrl();
  }
}
