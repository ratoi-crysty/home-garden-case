import { Component, input, output } from '@angular/core';
import { PlantModel } from '@itp-home-garden/api-interfaces';
import { PlantListRowComponent } from './plant-list-row/plant-list-row.component';
import { EmptyStateComponent } from '../../../../core/components/empty-state/empty-state.component';
import { MatDivider, MatList } from '@angular/material/list';
import { MatCard } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-plant-list',
  imports: [
    PlantListRowComponent,
    EmptyStateComponent,
    MatDivider,
    MatList,
    MatCard,
    MatIcon,
    MatIcon,
    MatButton,
    MatButton,
  ],
  templateUrl: './plant-list.component.html',
  styleUrl: './plant-list.component.scss',
})
export class PlantListComponent {
  readonly plants = input.required<PlantModel[]>();
  readonly disabled = input.required<boolean>();
  readonly create = output<void>();
  readonly remove = output<PlantModel>();
  readonly update = output<PlantModel>();
}
