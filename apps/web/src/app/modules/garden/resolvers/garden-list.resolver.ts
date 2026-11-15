import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { inject, InjectionToken } from '@angular/core';
import { GardensListStore } from '../stores/gardens-list.store';
import { GardenModel } from '@itp-home-garden/api-interfaces';
import { catchError, of } from 'rxjs';
import { LoggerService } from '../../../shared/log/logger.service';

export const GARDEN_LIST_RESOLVER_REDIRECT = new InjectionToken<string>(
  'garden.list-resolver-redirect',
  {
    providedIn: 'root',
    factory: () => '..',
  },
);

export const gardenListResolver: ResolveFn<GardenModel[]> = () => {
  const gardensStore = inject(GardensListStore);
  const router = inject(Router);
  const logger = inject(LoggerService);
  const redirectPath: string = inject(GARDEN_LIST_RESOLVER_REDIRECT);

  return gardensStore.loadList().pipe(
    catchError(() => {
      logger.error('Failed to get garden list', { redirectPath }, 'GardenListResolver');

      return of(new RedirectCommand(router.parseUrl(redirectPath)));
    }),
  );
};
