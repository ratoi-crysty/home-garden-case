import { Routes } from '@angular/router';
import { GardensListPageComponent } from './pages/list/gardens-list-page.component';
import { GardensPath } from './gardens.navigation';
import { gardensListResolver } from './resolvers/gardens-list.resolver';
import { GardensListStore } from './stores/gardens-list.store';

export const gardensWebRoutes: Routes = [
  {
    path: GardensPath.Base,
    providers: [GardensListStore],
    component: GardensListPageComponent,
    runGuardsAndResolvers: 'always',
    resolve: {
      list: gardensListResolver,
    },
    children: [],
  },
];
