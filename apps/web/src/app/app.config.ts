import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  Type,
} from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ErrorStateMatcher } from '@angular/material/core';
import { DirtyStateMatcherService } from './core/matcher/dirty-state-matcher.service';
import { API_BASE_PATH } from './shared/api/api.const';
import { LOG_LEVEL } from './shared/log/logger.service';
import { TokenType } from './shared/injection/injection.types';
import { retryInterceptor } from './core/api/retry-interceptor';
import { GARDEN_NAVIGATION } from './modules/garden/garden.navigation';
import { AppNavigationService } from './core/app-navigation/app-navigation.service';
import { PLANT_NAVIGATION } from './modules/plant/plant.navigation';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: LOG_LEVEL, useValue: environment.logLevel satisfies TokenType<typeof LOG_LEVEL> },
    { provide: ErrorStateMatcher, useClass: DirtyStateMatcherService },
    {
      provide: API_BASE_PATH,
      useValue: environment.baseApi satisfies TokenType<typeof API_BASE_PATH>,
    },
    {
      provide: GARDEN_NAVIGATION,
      useExisting: AppNavigationService satisfies Type<TokenType<typeof GARDEN_NAVIGATION>>,
    },
    {
      provide: PLANT_NAVIGATION,
      useExisting: AppNavigationService satisfies Type<TokenType<typeof GARDEN_NAVIGATION>>,
    },
    provideHttpClient(withInterceptors([retryInterceptor])),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withPreloading(PreloadAllModules)),
  ],
};
