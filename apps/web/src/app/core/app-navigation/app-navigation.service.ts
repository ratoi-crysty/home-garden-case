import { Injectable } from '@angular/core';
import { GardenNavigation } from '../../modules/garden/garden.navigation';
import { CommonNavigation } from '../../shared/navigation/common.navigation';
import { PlantNavigation } from '../../modules/plant/plant.navigation';

@Injectable({
  providedIn: 'root',
})
export class AppNavigationService implements CommonNavigation, GardenNavigation, PlantNavigation {
  notFound(): string[] {
    return ['/not-found'];
  }
  broken(): string[] {
    return ['/broken'];
  }
  gardenList(): string[] {
    return ['/'];
  }
  gardenItem(gardenId: string): string[] {
    return ['/gardens', gardenId];
  }
  plantList(): string[] {
    return ['/plants'];
  }
  plantItem(plantId: string): string[] {
    return ['/plants', plantId];
  }
}
