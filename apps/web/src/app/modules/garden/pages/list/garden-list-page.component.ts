import { Component, effect, inject, Injector, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GardenFormComponent } from '../../components/garden-form/garden-form.component';
import { GardensListStore, GardensListStoreLoading } from '../../stores/gardens-list.store';
import { GardenListItemComponent } from '../../components/list-item/garden-list-item.component';
import { MatButton } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { CreateGardenRequest, GardenModel } from '@itp-home-garden/api-interfaces';

@Component({
  standalone: true,
  selector: 'app-garden-web',
  imports: [GardenListItemComponent, MatButton],
  templateUrl: './garden-list-page.component.html',
  styleUrl: './garden-list-page.component.css',
})
export class GardenListPageComponent {
  protected readonly injector = inject(Injector);
  protected readonly dialog = inject(MatDialog);
  protected readonly store = inject(GardensListStore);
  protected readonly list: Signal<GardenModel[]> = toSignal<GardenModel[]>(this.store.getData(), {
    requireSync: true,
  });
  protected readonly loading = toSignal<GardensListStoreLoading>(this.store.getLoading(), {
    requireSync: true,
  });

  constructor() {
    effect(() => {
      console.log('List', { list: this.list() });
    });
  }

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
