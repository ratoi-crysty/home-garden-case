import { Component, input, output } from '@angular/core';

import { GardenModel } from '@itp-home-garden/api-interfaces';

@Component({
  selector: 'app-garden-list-item',
  imports: [],
  templateUrl: './garden-list-item.component.html',
  styleUrl: './garden-list-item.component.scss',
})
export class GardenListItemComponent {
  readonly garden = input.required<GardenModel>();
  readonly remove = output<GardenModel>();
  readonly update = output<GardenModel>();

  handleRemove() {
    this.remove.emit(this.garden());
  }

  handleUpdate() {
    this.update.emit(this.garden());
  }
}
