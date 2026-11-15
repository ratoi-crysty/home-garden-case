import { Injectable } from '@angular/core';
import { CrudApiService } from '@itp-home-garden/api-web';
import {
  CreateGardenRequest,
  GardenModel,
  UpdateGardenRequest,
} from '@itp-home-garden/gardens-types';

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
