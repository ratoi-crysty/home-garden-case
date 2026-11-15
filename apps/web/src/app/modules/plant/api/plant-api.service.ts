import { Injectable } from '@angular/core';
import { CrudApiService } from '../../../shared/api/crud/crud-api.service';
import {
  CreatePlantRequest,
  PlantModel,
  UpdatePlantRequest,
} from '@itp-home-garden/api-interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlantApiService extends CrudApiService<
  PlantModel,
  CreatePlantRequest,
  UpdatePlantRequest,
  number
> {
  protected override readonly basePath = 'plants';

  getAll(gardenId: number): Observable<PlantModel[]> {
    return this.http.get<PlantModel[]>(this.getAllUrl(gardenId));
  }

  getAllUrl(gardenId: number): string {
    return this.buildUrl(`garden/${gardenId}`);
  }
}
