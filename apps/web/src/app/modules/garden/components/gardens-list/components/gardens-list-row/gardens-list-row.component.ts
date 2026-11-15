import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GardenModel } from '@itp-home-garden/api-interfaces';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import {
  MatListItem,
  MatListItemIcon,
  MatListItemLine,
  MatListItemMeta,
  MatListItemTitle,
} from '@angular/material/list';
import { MatTooltip } from '@angular/material/tooltip';
import { GARDEN_NAVIGATION } from '../../../../garden.navigation';

@Component({
  selector: 'app-gardens-list-row',
  imports: [
    DecimalPipe,
    RouterLink,
    MatListItem,
    MatListItemIcon,
    MatListItemTitle,
    MatListItemLine,
    MatListItemMeta,
    MatIconButton,
    MatIcon,
    MatTooltip,
  ],
  templateUrl: './gardens-list-row.component.html',
  styleUrl: './gardens-list-row.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GardensListRowComponent {
  readonly garden = input.required<GardenModel>();
  readonly disabled = input<boolean>(false);

  readonly edit = output<GardenModel>();
  readonly remove = output<GardenModel>();

  protected readonly gardenNavigation = inject(GARDEN_NAVIGATION);
  protected readonly link = computed(() =>
    this.gardenNavigation.gardenItem(this.garden().gardenId.toString()),
  );
}
