import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Data } from '@angular/router';
import { map } from 'rxjs';
import { GardenModel } from '@itp-home-garden/api-interfaces';
import { PageLayoutComponent } from '../../../../shared/ui';
import { GardenDetailsComponent } from '../../components/garden-details/garden-details.component';
import { GARDEN_NAVIGATION, GardenNavigation } from '../../garden.navigation';

@Component({
  selector: 'app-garden-item-page',
  imports: [PageLayoutComponent, GardenDetailsComponent],
  templateUrl: './garden-item-page.component.html',
  styleUrl: './garden-item-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GardenItemPageComponent {
  protected readonly route = inject(ActivatedRoute);
  protected readonly gardenNavigation: GardenNavigation = inject(GARDEN_NAVIGATION);
  protected readonly link = this.gardenNavigation.gardenList();
  protected readonly garden: Signal<GardenModel> = toSignal<GardenModel>(
    this.route.data.pipe(map((data: Data): GardenModel => data['garden'] as GardenModel)),
    { requireSync: true },
  );
}
