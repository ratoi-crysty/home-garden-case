import { Route } from '@angular/router';
import { GardensPath } from './modules/garden/garden.navigation';
import { GardensListStore } from './modules/garden/stores/gardens-list.store';
import { GardenListPageComponent } from './modules/garden/pages/list/garden-list-page.component';
import { gardenListResolver } from './modules/garden/resolvers/garden-list.resolver';

export const appRoutes: Route[] = [
  {
    path: GardensPath.List,
    providers: [GardensListStore],
    component: GardenListPageComponent,
    runGuardsAndResolvers: 'always',
    resolve: {
      list: gardenListResolver,
    },
  },
];
