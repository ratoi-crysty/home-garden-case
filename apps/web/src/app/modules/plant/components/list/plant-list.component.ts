import { Component, input } from '@angular/core';
import { PlantModel } from '@itp-home-garden/api-interfaces';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-plant-list',
  imports: [JsonPipe],
  templateUrl: './plant-list.component.html',
  styleUrl: './plant-list.component.scss',
})
export class PlantListComponent {
  readonly plants = input.required<PlantModel[]>();
}
