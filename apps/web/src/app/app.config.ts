import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ErrorStateMatcher } from '@angular/material/core';
import { DirtyStateMatcherService } from './core/matcher/dirty-state-matcher.service';
import { API_BASE_PATH } from './shared/api/api.const';
import { LOG_LEVEL } from './shared/log/logger.service';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOG_LEVEL, useValue: '' },
    { provide: ErrorStateMatcher, useClass: DirtyStateMatcherService },
    { provide: API_BASE_PATH, useValue: environment.baseApi },
    provideHttpClient(),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
  ],
};
