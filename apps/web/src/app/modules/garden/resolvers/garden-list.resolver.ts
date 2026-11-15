import { ResolveFn } from '@angular/router';
import { inject, InjectionToken } from '@angular/core';
import { GardenModel } from '@itp-home-garden/api-interfaces';
import { GardenListStoreService } from '../stores/list/garden-list-store.service';
import { GARDEN_NAVIGATION } from '../garden.navigation';
import { handleStoreResolve } from '../../../shared/navigation/store-resolver.utils';

export const GARDEN_LIST_RESOLVER_REDIRECT = new InjectionToken<string>(
  'garden.list-resolver-redirect',
  {
    providedIn: 'root',
    factory: () => '..',
  },
);

export const gardenListResolver: ResolveFn<GardenModel[]> = () => {
  const store = inject(GardenListStoreService);
  const gardenNavigation = inject(GARDEN_NAVIGATION);

  return handleStoreResolve({
    navigation: gardenNavigation,
    store,
    req: undefined,
    ctx: 'GardenListResolver',
  });
};
