import { Component, input, output } from '@angular/core';
import { GardenModel } from '@itp-home-garden/api-interfaces';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatDivider } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';
import { MatList } from '@angular/material/list';
import { EmptyStateComponent } from '../../../../core/components/empty-state/empty-state.component';
import { GardensListRowComponent } from './components/gardens-list-row/gardens-list-row.component';

/** Presentational list of gardens with edit/delete actions and an empty state. */
@Component({
  selector: 'app-gardens-list',
  imports: [
    GardensListRowComponent,
    EmptyStateComponent,
    MatCard,
    MatList,
    MatDivider,
    MatButton,
    MatIcon,
  ],
  templateUrl: './gardens-list.component.html',
  styleUrl: './gardens-list.component.scss',
})
export class GardensListComponent {
  readonly gardens = input.required<GardenModel[]>();
  readonly disabled = input<boolean>(false);

  readonly create = output<void>();
  readonly edit = output<GardenModel>();
  readonly remove = output<GardenModel>();
}
