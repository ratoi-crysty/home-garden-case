import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { GardensService } from '../services/gardens-service';
import {
  CreateGardenRequest,
  GardenModel,
  UpdateGardenRequest,
} from '@itp-home-garden/api-interfaces';

export enum GardenListLoadingType {
  Load = 'load',
  Create = 'create',
  Delete = 'delete',
  Update = 'update',
}

export type GardensListStoreLoading = Record<GardenListLoadingType, boolean>;

@Injectable()
export class GardensListStore {
  protected readonly gardensService = inject(GardensService);
  protected readonly data$ = new BehaviorSubject<GardenModel[] | undefined>(undefined);
  protected readonly loading$ = new BehaviorSubject<GardensListStoreLoading>({
    [GardenListLoadingType.Load]: false,
    [GardenListLoadingType.Create]: false,
    [GardenListLoadingType.Delete]: false,
    [GardenListLoadingType.Update]: false,
  });

  getData(): Observable<GardenModel[]> {
    return this.data$
      .asObservable()
      .pipe(
        switchMap((data: GardenModel[] | undefined) =>
          data
            ? of(data)
            : throwError(() => new Error('Store was not loaded before reading the data')),
        ),
      );
  }

  getLoading(): Observable<GardensListStoreLoading> {
    return this.loading$.asObservable();
  }

  getIsLoading(): Observable<boolean> {
    return this.loading$.pipe(
      map((loading: GardensListStoreLoading): boolean => Object.values(loading).some(Boolean)),
    );
  }

  loadList(): Observable<GardenModel[]> {
    return this.execute<GardenModel[]>(
      GardenListLoadingType.Load,
      this.gardensService.getAll().pipe(
        tap((gardens: GardenModel[]) => {
          this.data$.next(gardens);
        }),
      ),
    );
  }

  create(details: CreateGardenRequest): Observable<GardenModel> {
    return this.execute<GardenModel>(
      GardenListLoadingType.Create,
      this.gardensService.create(details),
    );
  }

  update(id: number, details: UpdateGardenRequest): Observable<GardenModel> {
    return this.execute<GardenModel>(
      GardenListLoadingType.Create,
      this.gardensService.update(id, details),
    );
  }

  remove(id: number): Observable<undefined> {
    return this.execute<undefined>(GardenListLoadingType.Delete, this.gardensService.remove(id));
  }

  protected execute<T>(type: GardenListLoadingType, mutation$: Observable<T>): Observable<T> {
    return of(undefined).pipe(
      tap(() => {
        return this.setLoading(type, true);
      }),
      switchMap(() => mutation$),
      tap(() => {
        return this.setLoading(type, false);
      }),
      catchError((err) => {
        this.setLoading(type, false);

        return throwError(() => err);
      }),
    );
  }

  protected setLoading(type: GardenListLoadingType, value: boolean) {
    this.loading$.next({ ...this.loading$.getValue(), [type]: value });
  }
}
