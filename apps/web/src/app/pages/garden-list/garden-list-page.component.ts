import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  signal,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GardenFormComponent } from '../../modules/garden/components/garden-form/garden-form.component';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { catchError, EMPTY, merge, Observable, of, switchMap, tap } from 'rxjs';
import { CreateGardenRequest, GardenModel } from '@itp-home-garden/api-interfaces';
import { PageLayoutComponent } from '../../shared/ui';
import { GardensListComponent } from '../../modules/garden/components/gardens-list/gardens-list.component';
import { GardenListStoreService } from '../../modules/garden/stores/list/garden-list-store.service';
import { ApiSwrService } from '../../shared/api/swr/api-swr.service';
import { GardenApiService } from '../../modules/garden/api/garden-api.service';
import { LoggerService } from '../../shared/log/logger.service';

@Component({
  selector: 'app-garden-list-page',
  imports: [PageLayoutComponent, GardensListComponent, MatButton, MatIcon],
  templateUrl: './garden-list-page.component.html',
  styleUrl: './garden-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GardenListPageComponent {
  protected readonly injector = inject(Injector);
  protected readonly dialog = inject(MatDialog);
  protected readonly store = inject(GardenListStoreService);
  protected readonly isLoading = signal<boolean>(false);
  protected readonly apiSwr = inject(ApiSwrService);
  protected readonly gardenApi = inject(GardenApiService);
  protected readonly logger = inject(LoggerService);

  protected readonly list: Signal<GardenModel[]> = toSignal<GardenModel[]>(this.store.getData(), {
    requireSync: true,
  });

  protected openDialog(garden?: GardenModel) {
    const dialogRef: MatDialogRef<GardenFormComponent> = this.dialog.open(GardenFormComponent, {
      injector: this.injector,
      data: garden,
    });

    dialogRef.componentInstance.save.subscribe((details: CreateGardenRequest) => {
      of(undefined)
        .pipe(
          tap(() => {
            this.clearCache(garden?.gardenId);
            this.isLoading.set(true);
          }),
          switchMap(() =>
            garden
              ? this.gardenApi.update(garden.gardenId, details)
              : this.gardenApi.create(details),
          ),
          switchMap(() => this.store.refreshData(undefined)),
        )
        .subscribe({
          complete: () => {
            this.isLoading.set(false);
            dialogRef.close();
          },
          error: () => {
            dialogRef.componentInstance.cancelLoading();
          },
        });
    });
  }

  protected clearCache(id?: number) {
    const clearObservables: Observable<unknown>[] = [
      this.apiSwr.remove(this.gardenApi.getAllUrl()),
    ];

    if (id) {
      clearObservables.push(this.apiSwr.remove(this.gardenApi.getByIdUrl(id)));
    }

    merge(...clearObservables)
      .pipe(
        catchError((err: Error) => {
          this.logger.error('Error when trying to clear cache', { id, err }, 'GardenListPage');

          return EMPTY;
        }),
      )
      .subscribe();
  }

  protected createNew() {
    this.openDialog();
  }

  protected update(garden: GardenModel) {
    this.openDialog(garden);
  }

  protected remove(garden: GardenModel) {
    of(undefined)
      .pipe(
        tap(() => {
          this.isLoading.set(true);
          this.clearCache(garden.gardenId);
        }),
        switchMap(() => this.gardenApi.remove(garden.gardenId)),
        switchMap(() => this.store.refreshData(undefined)),
      )
      .subscribe({
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }
}
