import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { inject, InjectionToken } from '@angular/core';
import { GardenModel } from '@itp-home-garden/api-interfaces';
import { GardenItemStoreService } from '../stores/item/garden-item-store.service';
import { handleStoreResolve } from '../../../shared/navigation/store-resolver.utils';
import { GARDEN_NAVIGATION } from '../garden.navigation';

export const GARDEN_ITEM_RESOLVER_REDIRECT = new InjectionToken<string>(
  'garden.item-resolver-redirect',
  {
    providedIn: 'root',
    factory: () => '..',
  },
);

export const gardenItemResolver: ResolveFn<GardenModel> = (route: ActivatedRouteSnapshot) => {
  const store = inject(GardenItemStoreService);
  const gardenNavigation = inject(GARDEN_NAVIGATION);

  const id = Number(route.paramMap.get('id'));

  return handleStoreResolve({
    navigation: gardenNavigation,
    store,
    req: id,
    ctx: 'GardenItemResolver',
  });
};
