import { Component, input, output } from '@angular/core';
import { PlantModel } from '@itp-home-garden/api-interfaces';
import { DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import {
  MatListItem,
  MatListItemIcon,
  MatListItemLine,
  MatListItemMeta,
  MatListItemTitle,
} from '@angular/material/list';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-plant-list-row',
  imports: [
    MatTooltip,
    MatListItemLine,
    MatListItemLine,
    MatListItemIcon,
    MatIconButton,
    MatTooltip,
    MatListItemMeta,
    MatListItemTitle,
    MatIconButton,
    MatListItem,
    MatIcon,
    MatIcon,
    MatIcon,
    DecimalPipe,
    TitleCasePipe,
    DatePipe,
    DecimalPipe,
  ],
  templateUrl: './plant-list-row.component.html',
  styleUrl: './plant-list-row.component.scss',
})
export class PlantListRowComponent {
  readonly plant = input.required<PlantModel>();
  readonly remove = output<PlantModel>();
  readonly update = output<PlantModel>();
  readonly disabled = input.required<boolean>();

  protected handleRemove() {
    this.remove.emit(this.plant());
  }

  protected handleUpdate() {
    this.update.emit(this.plant());
  }
}
