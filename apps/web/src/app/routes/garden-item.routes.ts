import { Routes } from '@angular/router';
import { GardenItemStoreService } from '../modules/garden/stores/item/garden-item-store.service';
import { PlantListStoreService } from '../modules/plant/stores/list/plant-list-store.service';
import { gardenItemResolver } from '../modules/garden/resolvers/garden-item.resolver';
import { plantListResolver } from '../modules/plant/resolvers/plant-list.resolver';

export const routes: Routes = [
  {
    path: ':id',
    pathMatch: 'full',
    providers: [GardenItemStoreService, PlantListStoreService],
    loadComponent: () =>
      import('../pages/garden-item/garden-item-page.component').then(
        ({ GardenItemPageComponent }) => GardenItemPageComponent,
      ),
    resolve: {
      garden: gardenItemResolver,
      plantList: plantListResolver,
    },
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/not-found',
  },
];
