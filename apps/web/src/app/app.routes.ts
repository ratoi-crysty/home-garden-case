import { Route } from '@angular/router';
import { GARDEN_BASE_PATH, GardensPath } from './modules/garden/garden.navigation';
import { GardensListStore } from './modules/garden/stores/gardens-list.store';
import { GardenListPageComponent } from './modules/garden/pages/list/garden-list-page.component';
import {
  GARDEN_LIST_RESOLVER_REDIRECT,
  gardenListResolver,
} from './modules/garden/resolvers/garden-list.resolver';
import {
  GARDEN_ITEM_RESOLVER_REDIRECT,
  gardenItemResolver,
} from './modules/garden/resolvers/garden-item.resolver';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { BrokenPageComponent } from './core/pages/broken/broken-page.component';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/gardens',
  },
  {
    path: 'gardens',
    providers: [{ provide: GARDEN_BASE_PATH, useValue: '/gardens' }],
    children: [
      {
        path: GardensPath.List,
        pathMatch: 'full',
        providers: [
          GardensListStore,
          { provide: GARDEN_LIST_RESOLVER_REDIRECT, useValue: '/broken' },
        ],
        component: GardenListPageComponent,
        resolve: {
          list: gardenListResolver,
        },
      },
      {
        path: GardensPath.Item,
        pathMatch: 'full',
        providers: [{ provide: GARDEN_ITEM_RESOLVER_REDIRECT, useValue: '/not-found' }],
        loadComponent: () =>
          import('./modules/garden/pages/item/garden-item-page.component').then(
            ({ GardenItemPageComponent }) => GardenItemPageComponent,
          ),
        resolve: {
          list: gardenItemResolver,
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
