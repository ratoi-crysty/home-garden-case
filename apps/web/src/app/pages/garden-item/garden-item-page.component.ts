import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Injector,
  signal,
  Signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CreatePlantRequest, GardenModel, PlantModel } from '@itp-home-garden/api-interfaces';
import { PageLayoutComponent } from '../../shared/ui';
import { GardenDetailsComponent } from '../../modules/garden/components/garden-details/garden-details.component';
import { GARDEN_NAVIGATION, GardenNavigation } from '../../modules/garden/garden.navigation';
import { GardenItemStoreService } from '../../modules/garden/stores/item/garden-item-store.service';
import { PlantListStoreService } from '../../modules/plant/stores/list/plant-list-store.service';
import { PlantListComponent } from '../../modules/plant/components/plant-list/plant-list.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { catchError, EMPTY, merge, Observable, of, switchMap, tap } from 'rxjs';
import { PlantApiService } from '../../modules/plant/api/plant-api.service';
import { ApiSwrService } from '../../shared/api/swr/api-swr.service';
import { LoggerService } from '../../shared/log/logger.service';
import {
  PlantFormComponent,
  PlantFormData,
} from '../../modules/plant/components/plant-form/plant-form.component';

@Component({
  selector: 'app-garden-item-page',
  imports: [PageLayoutComponent, GardenDetailsComponent, PlantListComponent],
  templateUrl: './garden-item-page.component.html',
  styleUrl: './garden-item-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GardenItemPageComponent {
  protected readonly injector = inject(Injector);
  protected readonly dialog = inject(MatDialog);
  protected readonly apiSwr = inject(ApiSwrService);
  protected readonly logger = inject(LoggerService);
  protected readonly plantApi = inject(PlantApiService);
  protected readonly gardenItemStore = inject(GardenItemStoreService);
  protected readonly plantListStore = inject(PlantListStoreService);
  protected readonly gardenNavigation: GardenNavigation = inject(GARDEN_NAVIGATION);
  protected readonly link = this.gardenNavigation.gardenList();
  protected readonly isLoading = signal<boolean>(false);
  protected readonly garden: Signal<GardenModel> = toSignal<GardenModel>(
    this.gardenItemStore.getData(),
    {
      requireSync: true,
    },
  );
  protected readonly plants: Signal<PlantModel[]> = toSignal(this.plantListStore.getData(), {
    requireSync: true,
  });

  protected openDialog(plant?: PlantModel) {
    const dialogRef: MatDialogRef<PlantFormComponent> = this.dialog.open(PlantFormComponent, {
      injector: this.injector,
      data: {
        gardenId: this.garden().gardenId,
        gardenSize: this.garden().totalSurfaceArea,
        plant,
      } satisfies PlantFormData,
    });

    dialogRef.componentInstance.save.subscribe((details: CreatePlantRequest) => {
      of(undefined)
        .pipe(
          tap(() => {
            this.clearCache(plant?.gardenId);
            this.isLoading.set(true);
          }),
          switchMap(() =>
            plant ? this.plantApi.update(plant.plantId, details) : this.plantApi.create(details),
          ),
          switchMap(() => this.plantListStore.refreshData(this.garden().gardenId)),
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
      this.apiSwr.remove(this.plantApi.getAllUrl(this.garden().gardenId)),
    ];

    if (id) {
      clearObservables.push(this.apiSwr.remove(this.plantApi.getByIdUrl(id)));
    }

    merge(...clearObservables)
      .pipe(
        catchError((err: Error) => {
          this.logger.error('Error when trying to clear cache', { id, err }, 'GardenItemPage');

          return EMPTY;
        }),
      )
      .subscribe();
  }

  protected createNew() {
    this.openDialog();
  }

  protected update(plant: PlantModel) {
    this.openDialog(plant);
  }

  protected remove(plant: PlantModel) {
    of(undefined)
      .pipe(
        tap(() => {
          this.isLoading.set(true);
          this.clearCache(plant.plantId);
        }),
        switchMap(() => this.plantApi.remove(plant.plantId)),
        switchMap(() => this.plantListStore.refreshData(this.garden().gardenId)),
      )
      .subscribe({
        complete: () => {
          this.isLoading.set(false);
        },
      });
  }
}
