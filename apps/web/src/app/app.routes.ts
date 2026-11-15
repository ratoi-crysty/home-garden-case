import { Route } from '@angular/router';
import { GardenListPageComponent } from './pages/garden-list/garden-list-page.component';
import { gardenListResolver } from './modules/garden/resolvers/garden-list.resolver';
import { GardenListStoreService } from './modules/garden/stores/list/garden-list-store.service';
import { BrokenPageComponent } from './core/pages/broken/broken-page.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';

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
    component: NotFoundComponent,
  },
  {
    path: 'broken',
    pathMatch: 'full',
    component: BrokenPageComponent,
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];
