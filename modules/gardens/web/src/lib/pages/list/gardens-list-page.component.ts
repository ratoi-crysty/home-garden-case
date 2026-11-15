import { Component, effect, inject, Injector, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GardenFormComponent } from './components/garden-form/garden-form.component';
import { GardensListStore, GardensListStoreLoading } from '../../stores/gardens-list.store';
import { GardenListItemComponent } from './components/list-item/garden-list-item.component';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { GardenModel } from '@itp-home-garden/gardens-types';
import { switchMap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'lib-gardens-web',
  imports: [GardenListItemComponent, MatButton],
  templateUrl: './gardens-list-page.component.html',
  styleUrl: './gardens-list-page.component.css',
})
export class GardensListPageComponent {
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
    this.dialog.open(GardenFormComponent, {
      injector: this.injector,
      data: garden,
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
