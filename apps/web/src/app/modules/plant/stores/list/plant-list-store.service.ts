import { inject, Injectable } from '@angular/core';
import { ApiStoreService } from '../../../../shared/api/stores/api-store.service';
import { PlantModel } from '@itp-home-garden/api-interfaces';
import { Observable } from 'rxjs';
import { PlantApiService } from '../../api/plant-api.service';

@Injectable()
export class PlantListStoreService extends ApiStoreService<PlantModel[], undefined> {
  protected override name = 'plant-list';
  protected readonly plantApi = inject(PlantApiService);

  protected override getCacheKey(): string {
    return this.plantApi.getAllUrl();
  }
  protected override fetchData(): Observable<PlantModel[]> {
    return this.plantApi.getAll();
  }
}
