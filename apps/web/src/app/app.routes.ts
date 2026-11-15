import { Route } from '@angular/router';
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
import { TokenType } from './shared/injection/injection.types';
import { GARDEN_NAVIGATION } from './modules/garden/garden.navigation';
import { AppNavigationService } from './core/app-navigation/app-navigation.service';
import { inject, Type } from '@angular/core';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/gardens',
  },
  {
    path: 'gardens',
    providers: [
      {
        provide: GARDEN_NAVIGATION,
        useExisting: AppNavigationService satisfies Type<TokenType<typeof GARDEN_NAVIGATION>>,
      },
    ],
    children: [
      {
        path: '',
        pathMatch: 'full',
        providers: [
          GardensListStore,
          {
            provide: GARDEN_LIST_RESOLVER_REDIRECT,
            useFactory: (): TokenType<typeof GARDEN_LIST_RESOLVER_REDIRECT> => {
              const navigation = inject(AppNavigationService);

              return navigation.broken().join('/');
            },
          },
        ],
        component: GardenListPageComponent,
        resolve: {
          list: gardenListResolver,
        },
      },
      {
        path: ':id',
        pathMatch: 'full',
        providers: [
          {
            provide: GARDEN_ITEM_RESOLVER_REDIRECT,
            useFactory: (): TokenType<typeof GARDEN_ITEM_RESOLVER_REDIRECT> => {
              const navigation = inject(AppNavigationService);

              return navigation.broken().join('/');
            },
          },
        ],
        loadComponent: () =>
          import('./modules/garden/pages/item/garden-item-page.component').then(
            ({ GardenItemPageComponent }) => GardenItemPageComponent,
          ),
        resolve: {
          garden: gardenItemResolver,
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
