import { InjectionToken } from '@angular/core';

export const GARDENS_BASE_PATH = new InjectionToken<string>('GARDENS_WEB_BASE_PATH');
export enum GardensPath {
  List = '',
  Item = ':id',
}
