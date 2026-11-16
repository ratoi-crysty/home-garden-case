import { inject, Injectable } from '@angular/core';
import { ApiStoreService } from '../../../../shared/api/stores/api-store.service';
import { PlantModel } from '@itp-home-garden/api-interfaces';
import { Observable } from 'rxjs';
import { PlantApiService } from '../../api/plant-api.service';
import { GardenApiService } from '../../../garden/api/garden-api.service';

@Injectable()
export class PlantListStoreService extends ApiStoreService<PlantModel[], number> {
  protected override name = 'plant-garden-list';
  protected readonly plantApi = inject(PlantApiService);
  protected readonly gardenApi = inject(GardenApiService);

  protected override getCacheKey(gardenId: number): string {
    return this.plantApi.getAllUrl(gardenId);
  }
  protected override fetchData(gardenId: number): Observable<PlantModel[]> {
    return this.plantApi.getAll(gardenId);
  }
}
