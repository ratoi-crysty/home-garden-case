import { InjectionToken } from '@angular/core';
import { CommonNavigation } from '../../shared/navigation/common.navigation';

export interface GardenNavigation extends CommonNavigation {
  gardenList(): string[];
  gardenItem(gardenId: string): string[];
}

export const GARDEN_NAVIGATION = new InjectionToken<GardenNavigation>('garden.app-navigation');
