import { ApiStoreService } from '../api/stores/api-store.service';
import { inject } from '@angular/core';
import { LoggerService } from '../log/logger.service';
import { catchError, Observable, of } from 'rxjs';
import { RedirectCommand, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonNavigation } from './common.navigation';

export interface StoreResolverDetails<T, R> {
  ctx: string;
  req: R;
  store: ApiStoreService<T, R>;
  navigation: CommonNavigation;
}

export function handleStoreResolve<T, R>({
  ctx,
  navigation,
  req,
  store,
}: StoreResolverDetails<T, R>): Observable<T | RedirectCommand> {
  const logger = inject(LoggerService);
  const router = inject(Router);

  store.reset();
  store.load(req);

  return store.getData().pipe(
    catchError((err: unknown): Observable<RedirectCommand> => {
      const redirectPath =
        err instanceof HttpErrorResponse && err.status === 404
          ? navigation.notFound()
          : navigation.broken();

      logger.error('Failed to get garden item', { req, redirectPath, err }, ctx);

      return of(new RedirectCommand(router.parseUrl(redirectPath.join('/'))));
    }),
  );
}
