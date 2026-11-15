import { ResolveFn } from '@angular/router';
import { GardenModel } from '@itp-home-garden/gardens-types';
import { inject } from '@angular/core';
import { GardensListStore } from '../stores/gardens-list.store';

export const gardensListResolver: ResolveFn<GardenModel[]> = () => {
  const gardensStore = inject(GardensListStore);

  return gardensStore.loadList();
};
