import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { PlantModel } from '@itp-home-garden/api-interfaces';
import { handleStoreResolve } from '../../../shared/navigation/store-resolver.utils';
import { PlantItemStoreService } from '../stores/item/plant-item-store.service';
import { PLANT_NAVIGATION } from '../plant.navigation';

export const plantItemResolver: ResolveFn<PlantModel> = (route: ActivatedRouteSnapshot) => {
  const store = inject(PlantItemStoreService);
  const navigation = inject(PLANT_NAVIGATION);

  const id = Number(route.paramMap.get('id'));

  return handleStoreResolve({
    navigation,
    store,
    req: id,
    ctx: 'PlantItemResolver',
  });
};
