import { inject, Injectable } from '@angular/core';
import { ApiStoreService } from '../../../../shared/api/stores/api-store.service';
import { GardenModel } from '@itp-home-garden/api-interfaces';
import { Observable } from 'rxjs';
import { GardenApiService } from '../../api/garden-api.service';

@Injectable()
export class GardenListStoreService extends ApiStoreService<GardenModel[], undefined> {
  protected override name = 'garden-list';
  protected readonly gardensService = inject(GardenApiService);

  protected override getCacheKey(): string {
    return this.gardensService.getAllUrl();
  }
  protected override fetchData(): Observable<GardenModel[]> {
    return this.gardensService.getAll();
  }
}
