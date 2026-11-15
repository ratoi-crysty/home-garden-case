import { Injectable } from '@angular/core';
import { GardenNavigation } from '../../modules/garden/garden.navigation';
import { CommonNavigation } from '../../shared/navigation/common.navigation';

@Injectable({
  providedIn: 'root',
})
export class AppNavigationService implements CommonNavigation, GardenNavigation {
  notFound(): string[] {
    return ['/not-found'];
  }
  broken(): string[] {
    return ['/broken'];
  }
  gardenList(): string[] {
    return ['/gardens'];
  }
  gardenItem(gardenId: string): string[] {
    return ['/gardens', gardenId];
  }
}
