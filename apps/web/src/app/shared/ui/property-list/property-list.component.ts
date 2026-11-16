import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {
  MatList,
  MatListItem,
  MatListItemIcon,
  MatListItemLine,
  MatListItemTitle,
} from '@angular/material/list';
import { PropertyListItem } from './models/property-list-item.model';

/** Read-only label/value pairs rendered as a Material garden-list. */
@Component({
  selector: 'app-property-list',
  imports: [MatList, MatListItem, MatListItemIcon, MatListItemTitle, MatListItemLine, MatIcon],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyListComponent {
  readonly items = input.required<PropertyListItem[]>();
  readonly emptyValue = input<string>('—');
}
