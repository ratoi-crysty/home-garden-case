import { InjectionToken } from '@angular/core';
import { CommonNavigation } from '../../shared/navigation/common.navigation';

export interface PlantNavigation extends CommonNavigation {
  plantList(): string[];
  plantItem(plantId: string): string[];
}

export const PLANT_NAVIGATION = new InjectionToken<PlantNavigation>('plant.app-navigation');
