import { ChangeDetectionStrategy, Component, inject, Injector, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GardenFormComponent } from '../../components/garden-form/garden-form.component';
import { GardensListStore } from '../../stores/gardens-list.store';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { CreateGardenRequest, GardenModel } from '@itp-home-garden/api-interfaces';
import { PageLayoutComponent } from '../../../../shared/ui';
import { GardensListComponent } from '../../components/gardens-list/gardens-list.component';

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
  protected readonly store = inject(GardensListStore);
  protected readonly list: Signal<GardenModel[]> = toSignal<GardenModel[]>(this.store.getData(), {
    requireSync: true,
  });
  protected readonly isLoading: Signal<boolean> = toSignal<boolean>(this.store.getIsLoading(), {
    requireSync: true,
  });

  protected openDialog(garden?: GardenModel) {
    const dialogRef: MatDialogRef<GardenFormComponent> = this.dialog.open(GardenFormComponent, {
      injector: this.injector,
      data: garden,
    });

    dialogRef.componentInstance.save.subscribe((details: CreateGardenRequest) => {
      const save$ = garden
        ? this.store.update(garden.gardenId, details)
        : this.store.create(details);

      save$.pipe(switchMap(() => this.store.loadList())).subscribe({
        complete: () => {
          dialogRef.close();
        },
        error: () => {
          dialogRef.componentInstance.cancelLoading();
        },
      });
    });
  }

  protected createNew() {
    this.openDialog();
  }

  protected update(garden: GardenModel) {
    this.openDialog(garden);
  }

  protected remove(garden: GardenModel) {
    this.store
      .remove(garden.gardenId)
      .pipe(switchMap(() => this.store.loadList()))
      .subscribe();
  }
}
