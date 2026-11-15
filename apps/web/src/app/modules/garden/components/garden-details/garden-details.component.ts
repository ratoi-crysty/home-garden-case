import { Component, computed, inject, input, LOCALE_ID, Signal } from '@angular/core';
import { formatDate, formatNumber } from '@angular/common';
import { GardenModel } from '@itp-home-garden/api-interfaces';
import {
  MatCard,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { PropertyListComponent, PropertyListItem } from '../../../../shared/ui';

/** Read-only card with all the details of a single garden. */
@Component({
  selector: 'app-garden-details',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardAvatar,
    MatCardTitle,
    MatCardSubtitle,
    MatCardContent,
    MatIcon,
    PropertyListComponent,
  ],
  templateUrl: './garden-details.component.html',
  styleUrl: './garden-details.component.scss',
})
export class GardenDetailsComponent {
  protected readonly locale: string = inject(LOCALE_ID);

  readonly garden = input.required<GardenModel>();

  protected readonly properties: Signal<PropertyListItem[]> = computed((): PropertyListItem[] => {
    const garden: GardenModel = this.garden();

    return [
      {
        label: 'Total surface area',
        icon: 'square_foot',
        value: `${formatNumber(garden.totalSurfaceArea, this.locale, '1.0-2')} m²`,
      },
      {
        label: 'Location',
        icon: 'place',
        value: garden.locationDescription || undefined,
      },
      {
        label: 'Coordinates (lat, long)',
        icon: 'my_location',
        value: this.formatCoordinates(garden),
      },
      { label: 'Created', icon: 'event', value: this.formatTimestamp(garden.createdAt) },
      { label: 'Last updated', icon: 'update', value: this.formatTimestamp(garden.updatedAt) },
    ];
  });

  protected formatCoordinates(garden: GardenModel): string | undefined {
    if (typeof garden.latitude !== 'number' || typeof garden.longitude !== 'number') {
      return undefined;
    }

    const format = (value: number): string => formatNumber(value, this.locale, '1.0-6');

    return `${format(garden.latitude)}, ${format(garden.longitude)}`;
  }

  /** API timestamps are SQLite `CURRENT_TIMESTAMP` values: UTC, `YYYY-MM-DD HH:MM:SS`. */
  protected formatTimestamp(value: string): string | undefined {
    if (!value) {
      return undefined;
    }

    const iso: string = value.includes('T') ? value : `${value.replace(' ', 'T')}Z`;
    const date = new Date(iso);

    return Number.isNaN(date.getTime()) ? value : formatDate(date, 'medium', this.locale);
  }
}
