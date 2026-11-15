import { InjectionToken } from '@angular/core';

export const GARDEN_BASE_PATH = new InjectionToken<string>('gardens.base-path');
export enum GardensPath {
  List = '',
  Item = ':id',
}
