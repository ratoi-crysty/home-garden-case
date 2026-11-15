import { inject, Injectable } from '@angular/core';
import { ApiStoreService } from '../../../../shared/api/stores/api-store.service';
import { PlantModel } from '@itp-home-garden/api-interfaces';
import { PlantApiService } from '../../api/plant-api.service';
import { Observable } from 'rxjs';

@Injectable()
export class PlantItemStoreService extends ApiStoreService<PlantModel, number> {
  protected override name = 'plant-item';
  protected readonly plantApi = inject(PlantApiService);

  protected override getCacheKey(id: number): string {
    return this.plantApi.getByIdUrl(id);
  }
  protected override fetchData(id: number): Observable<PlantModel> {
    return this.plantApi.getById(id);
  }
}
