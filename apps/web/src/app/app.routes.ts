import { Route } from '@angular/router';
import { GardenListPageComponent } from './pages/garden-list/garden-list-page.component';
import { gardenListResolver } from './modules/garden/resolvers/garden-list.resolver';
import { gardenItemResolver } from './modules/garden/resolvers/garden-item.resolver';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { BrokenPageComponent } from './core/pages/broken/broken-page.component';
import { GardenListStoreService } from './modules/garden/stores/list/garden-list-store.service';
import { GardenItemStoreService } from './modules/garden/stores/item/garden-item-store.service';
import { plantListResolver } from './modules/plant/resolvers/plant-list.resolver';
import { PlantListStoreService } from './modules/plant/stores/list/plant-list-store.service';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/gardens',
  },
  {
    path: 'gardens',
    children: [
      {
        path: '',
        pathMatch: 'full',
        providers: [GardenListStoreService],
        component: GardenListPageComponent,
        resolve: {
          list: gardenListResolver,
        },
      },
      {
        path: ':id',
        pathMatch: 'full',
        providers: [GardenItemStoreService, PlantListStoreService],
        loadComponent: () =>
          import('./pages/garden-item/garden-item-page.component').then(
            ({ GardenItemPageComponent }) => GardenItemPageComponent,
          ),
        resolve: {
          garden: gardenItemResolver,
          plantList: plantListResolver,
        },
      },
    ],
  },
  {
    path: 'not-found',
    pathMatch: 'full',
    component: NotFoundComponent,
  },
  {
    path: 'broken',
    pathMatch: 'full',
    component: BrokenPageComponent,
  },
];
