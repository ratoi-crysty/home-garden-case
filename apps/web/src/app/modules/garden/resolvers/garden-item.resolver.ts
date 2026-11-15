import { ActivatedRouteSnapshot, RedirectCommand, ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { GardenModel } from '@itp-home-garden/api-interfaces';
import { GardensService } from '../services/gardens-service';
import { catchError, of } from 'rxjs';

export const gardenItemResolver: ResolveFn<GardenModel> = (route: ActivatedRouteSnapshot) => {
  const gardensStore = inject(GardensService);
  const router = inject(Router);

  const id = Number(route.paramMap.get('id'));

  const backCommand = new RedirectCommand(router.parseUrl('..'));

  if (!id) {
    return backCommand;
  }

  return gardensStore.getById(id).pipe(catchError(() => of(backCommand)));
};
