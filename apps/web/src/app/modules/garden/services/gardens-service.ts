import { Injectable } from '@angular/core';
import {
  CreateGardenRequest,
  GardenModel,
  UpdateGardenRequest,
} from '@itp-home-garden/api-interfaces';
import { CrudApiService } from '../../../shared/api/crud-api.service';

@Injectable({
  providedIn: 'root',
})
export class GardensService extends CrudApiService<
  GardenModel,
  CreateGardenRequest,
  UpdateGardenRequest,
  number
> {
  protected override readonly basePath = 'gardens';
}
