import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GardenModel, PlantModel } from '@itp-home-garden/api-interfaces';
import { PageLayoutComponent } from '../../shared/ui';
import { GardenDetailsComponent } from '../../modules/garden/components/garden-details/garden-details.component';
import { GARDEN_NAVIGATION, GardenNavigation } from '../../modules/garden/garden.navigation';
import { GardenItemStoreService } from '../../modules/garden/stores/item/garden-item-store.service';
import { PlantListStoreService } from '../../modules/plant/stores/list/plant-list-store.service';
import { PlantListComponent } from '../../modules/plant/components/list/plant-list.component';

@Component({
  selector: 'app-garden-item-page',
  imports: [PageLayoutComponent, GardenDetailsComponent, PlantListComponent],
  templateUrl: './garden-item-page.component.html',
  styleUrl: './garden-item-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GardenItemPageComponent {
  protected readonly gardenItemStore = inject(GardenItemStoreService);
  protected readonly plantListStore = inject(PlantListStoreService);
  protected readonly gardenNavigation: GardenNavigation = inject(GARDEN_NAVIGATION);
  protected readonly link = this.gardenNavigation.gardenList();
  protected readonly garden: Signal<GardenModel> = toSignal<GardenModel>(
    this.gardenItemStore.getData(),
    {
      requireSync: true,
    },
  );
  protected readonly plants: Signal<PlantModel[]> = toSignal(this.plantListStore.getData(), {
    requireSync: true,
  });
}
