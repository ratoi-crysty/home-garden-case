import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { GardensListStore } from '../stores/gardens-list.store';
import { GardenModel } from '@itp-home-garden/api-interfaces';
import { catchError, of } from 'rxjs';

export const gardenListResolver: ResolveFn<GardenModel[]> = () => {
  const gardensStore = inject(GardensListStore);
  const router = inject(Router);

  return gardensStore
    .loadList()
    .pipe(catchError(() => of(new RedirectCommand(router.parseUrl('/')))));
};
