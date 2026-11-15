import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { inject, InjectionToken } from '@angular/core';
import { GardenModel } from '@itp-home-garden/api-interfaces';
import { catchError, of } from 'rxjs';
import { LoggerService } from '../../../shared/log/logger.service';
import { GardenListStoreService } from '../stores/list/garden-list-store.service';

export const GARDEN_LIST_RESOLVER_REDIRECT = new InjectionToken<string>(
  'garden.list-resolver-redirect',
  {
    providedIn: 'root',
    factory: () => '..',
  },
);

export const gardenListResolver: ResolveFn<GardenModel[]> = () => {
  const gardensStore = inject(GardenListStoreService);
  const router = inject(Router);
  const logger = inject(LoggerService);
  const redirectPath: string = inject(GARDEN_LIST_RESOLVER_REDIRECT);

  gardensStore.load(undefined);

  return gardensStore.getData().pipe(
    catchError(() => {
      logger.error('Failed to get garden list', { redirectPath }, 'GardenListResolver');

      return of(new RedirectCommand(router.parseUrl(redirectPath)));
    }),
  );
};
