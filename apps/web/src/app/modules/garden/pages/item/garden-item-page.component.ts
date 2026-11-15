import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Data } from '@angular/router';
import { map } from 'rxjs';
import { GardenModel } from '@itp-home-garden/api-interfaces';
import { GARDEN_BASE_PATH, GardensPath } from '../../garden.navigation';
import { PageLayoutComponent } from '../../../../shared/ui';
import { GardenDetailsComponent } from '../../components/garden-details/garden-details.component';

@Component({
  selector: 'app-garden-item-page',
  imports: [PageLayoutComponent, GardenDetailsComponent],
  templateUrl: './garden-item-page.component.html',
  styleUrl: './garden-item-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GardenItemPageComponent {
  protected readonly route = inject(ActivatedRoute);
  protected readonly basePath: string = inject(GARDEN_BASE_PATH);
  protected readonly link = [this.basePath, GardensPath.List];
  protected readonly garden: Signal<GardenModel> = toSignal<GardenModel>(
    this.route.data.pipe(map((data: Data): GardenModel => data['garden'] as GardenModel)),
    { requireSync: true },
  );
}
