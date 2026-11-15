import { Injectable } from '@angular/core';
import { CrudApiService } from '../../../shared/api/crud/crud-api.service';
import {
  CreatePlantRequest,
  PlantModel,
  UpdatePlantRequest,
} from '@itp-home-garden/api-interfaces';

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
}
