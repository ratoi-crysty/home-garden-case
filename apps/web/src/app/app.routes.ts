import { Route } from '@angular/router';
import { gardensWebRoutes } from '@itp-home-garden/gardens-web';

export const appRoutes: Route[] = [
  {
    path: '',
    children: gardensWebRoutes,
  },
];
