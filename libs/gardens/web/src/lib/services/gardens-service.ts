import { Injectable } from '@angular/core';
import {
  CreateGardenRequest,
  GardenModel,
  UpdateGardenRequest,
} from '@itp-home-garden/gardens-types';
import { BaseApiWeb } from '@itp-home-garden/api-web';

@Injectable({
  providedIn: 'root',
})
export class GardensService extends BaseApiWeb<
  GardenModel,
  CreateGardenRequest,
  UpdateGardenRequest,
  number
> {
  protected override readonly basePath = 'gardens';
}
