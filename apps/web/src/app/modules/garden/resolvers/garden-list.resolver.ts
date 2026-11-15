import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { GardenModel } from '@itp-home-garden/api-interfaces';
import { GardenListStoreService } from '../stores/list/garden-list-store.service';
import { GARDEN_NAVIGATION } from '../garden.navigation';
import { handleStoreResolve } from '../../../shared/navigation/store-resolver.utils';

export const gardenListResolver: ResolveFn<GardenModel[]> = () => {
  const store = inject(GardenListStoreService);
  const navigation = inject(GARDEN_NAVIGATION);

  return handleStoreResolve({
    navigation,
    store,
    req: undefined,
    ctx: 'GardenListResolver',
  });
};
