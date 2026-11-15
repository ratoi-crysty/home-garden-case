import { Route } from '@angular/router';
import { GardenListPageComponent } from './pages/garden-list/garden-list-page.component';
import { gardenListResolver } from './modules/garden/resolvers/garden-list.resolver';
import { GardenListStoreService } from './modules/garden/stores/list/garden-list-store.service';

export const appRoutes: Route[] = [
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
    path: 'gardens',
    loadChildren: () => import('./routes/garden-item.routes').then(({ routes }) => routes),
  },
  {
    path: 'not-found',
    pathMatch: 'full',
    loadComponent: () =>
      import('./core/pages/not-found/not-found.component').then(
        ({ NotFoundComponent }) => NotFoundComponent,
      ),
  },
  {
    path: 'broken',
    pathMatch: 'full',
    loadComponent: () =>
      import('./core/pages/broken/broken-page.component').then(
        ({ BrokenPageComponent }) => BrokenPageComponent,
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/not-found',
  },
];
