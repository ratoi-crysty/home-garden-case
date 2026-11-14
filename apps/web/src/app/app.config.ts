import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BASE_API_PATH } from '@itp-home-garden/api-web';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: BASE_API_PATH, useValue: environment.baseApi },
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
  ],
};
