import { Routes } from '@angular/router';
import { GardensWebComponent } from '../gardens-web.component';
import { GardensPath } from './gardens.navigation';
import { gardensListResolver } from '../resolvers/gardens-list.resolver';

export const gardensWebRoutes: Routes = [
  {
    path: GardensPath.Base,
    component: GardensWebComponent,
    resolve: {
      list: gardensListResolver,
    },
    children: [],
  },
];
