import { ActivatedRouteSnapshot, RedirectCommand, ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { PlantModel } from '@itp-home-garden/api-interfaces';
import { handleStoreResolve } from '../../../shared/navigation/store-resolver.utils';
import { PlantListStoreService } from '../stores/list/plant-list-store.service';
import { PLANT_NAVIGATION } from '../plant.navigation';

export const plantListResolver: ResolveFn<PlantModel[]> = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);
  const store = inject(PlantListStoreService);
  const navigation = inject(PLANT_NAVIGATION);

  const id = Number(route.paramMap.get('id'));

  if (!id) {
    return new RedirectCommand(router.parseUrl(navigation.notFound().join('/')));
  }

  return handleStoreResolve<PlantModel[], number>({
    navigation,
    store,
    req: id,
    ctx: 'PlantListResolver',
  });
};
