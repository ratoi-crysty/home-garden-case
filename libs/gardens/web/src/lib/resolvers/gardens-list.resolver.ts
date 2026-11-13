import { ResolveFn } from '@angular/router';
import { GardenModel } from '@itp-home-garden/gardens-types';
import { inject } from '@angular/core';
import { GardensService } from '../services/gardens-service';

export const gardensListResolver: ResolveFn<GardenModel[]> = () => {
  const gardensService = inject(GardensService);

  return gardensService.getAll();
};
