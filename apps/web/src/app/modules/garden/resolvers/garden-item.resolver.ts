import { ActivatedRouteSnapshot, RedirectCommand, ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { GardenModel } from '@itp-home-garden/api-interfaces';
import { GardenItemStoreService } from '../stores/item/garden-item-store.service';
import { handleStoreResolve } from '../../../shared/navigation/store-resolver.utils';
import { GARDEN_NAVIGATION } from '../garden.navigation';

export const gardenItemResolver: ResolveFn<GardenModel> = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const store = inject(GardenItemStoreService);
  const navigation = inject(GARDEN_NAVIGATION);

  const id = Number(route.paramMap.get('id'));

  if (!id) {
    return new RedirectCommand(router.parseUrl(navigation.notFound().join('/')));
  }

  return handleStoreResolve({
    navigation,
    store,
    req: id,
    ctx: 'GardenItemResolver',
  });
};
