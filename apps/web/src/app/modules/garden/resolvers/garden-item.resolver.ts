import { ActivatedRouteSnapshot, RedirectCommand, ResolveFn, Router } from '@angular/router';
import { inject, InjectionToken } from '@angular/core';
import { GardenModel } from '@itp-home-garden/api-interfaces';
import { GardensService } from '../services/gardens-service';
import { catchError, of } from 'rxjs';
import { LoggerService } from '../../../shared/log/logger.service';

export const GARDEN_ITEM_RESOLVER_REDIRECT = new InjectionToken<string>(
  'garden.item-resolver-redirect',
  {
    providedIn: 'root',
    factory: () => '..',
  },
);

export const gardenItemResolver: ResolveFn<GardenModel> = (route: ActivatedRouteSnapshot) => {
  const gardensStore = inject(GardensService);
  const router = inject(Router);
  const logger = inject(LoggerService);
  const redirectPath: string = inject(GARDEN_ITEM_RESOLVER_REDIRECT);

  const id = Number(route.paramMap.get('id'));

  const backCommand = new RedirectCommand(router.parseUrl(redirectPath));

  if (!id) {
    logger.debug('Got invalid ID', { id, redirectPath }, 'GardenItemResolver');
    return backCommand;
  }

  return gardensStore.getById(id).pipe(
    catchError(() => {
      logger.error('Failed to get garden item', { id, redirectPath }, 'GardenItemResolver');
      return of(backCommand);
    }),
  );
};
