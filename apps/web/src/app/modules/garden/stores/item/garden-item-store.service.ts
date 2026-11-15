import { inject, Injectable } from '@angular/core';
import { ApiStoreService } from '../../../../shared/api/stores/api-store.service';
import { GardenModel } from '@itp-home-garden/api-interfaces';
import { GardenApiService } from '../../api/garden-api.service';
import { Observable } from 'rxjs';

@Injectable()
export class GardenItemStoreService extends ApiStoreService<GardenModel, number> {
  protected override name = 'garden-item';
  protected readonly gardensService = inject(GardenApiService);

  protected override getCacheKey(id: number): string {
    return this.gardensService.getByIdUrl(id);
  }
  protected override fetchData(id: number): Observable<GardenModel> {
    return this.gardensService.getById(id);
  }
}
