import { Component, inject, output, signal } from '@angular/core';
import { form, FormField, max, validateStandardSchema } from '@angular/forms/signals';
import { CreatePlantRequest } from '@itp-home-garden/api-interfaces';
import { MAT_DIALOG_DATA, MatDialogClose } from '@angular/material/dialog';
import { createPlantSchema } from '@itp-home-garden/schemas';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { InputTextComponent } from '../../../../shared/fields/input-text/input-text.component';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { MatOption, MatSelect } from '@angular/material/select';
import { InputNumberComponent } from '../../../../shared/fields/input-number/input-number.component';
import { MatButton } from '@angular/material/button';
import { z } from 'zod/v4';
import {
  toDateInputValue,
  todayDateInputValue,
  toIsoDateTime,
} from '../../../../shared/date/date.utils';

/**
 * The native date input works with `YYYY-MM-DD` strings, while the API expects an ISO datetime.
 * The form validates the date-only value and converts it to an ISO datetime (UTC midnight) on submit.
 */
const plantFormSchema = createPlantSchema.extend({
  plantationDate: z.iso.date('Plantation date is required'),
});

export interface PlantFormData {
  gardenId: number;
  gardenSize: number;
  plant: CreatePlantRequest | undefined;
}

@Component({
  selector: 'app-plant-form',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    InputTextComponent,
    MatFormField,
    MatSelect,
    MatLabel,
    FormField,
    MatOption,
    MatError,
    InputNumberComponent,
    MatButton,
    MatDialogClose,
    MatInput,
  ],
  templateUrl: './plant-form.component.html',
  styleUrl: './plant-form.component.scss',
})
export class PlantFormComponent {
  protected data = inject<PlantFormData>(MAT_DIALOG_DATA);
  protected formData = signal<CreatePlantRequest>(this.getFormData(this.data));
  protected form = form(this.formData, (schemaPath) => {
    validateStandardSchema(schemaPath, plantFormSchema);

    max(schemaPath.surfaceAreaRequired, this.data.gardenSize, {
      message: `The input cannot exceed the garden size of ${this.data.gardenSize} m²`,
    });
  });
  protected readonly loading = signal<boolean>(false);

  readonly save = output<CreatePlantRequest>();

  cancelLoading() {
    this.loading.set(false);
  }

  protected getFormData(data: PlantFormData): CreatePlantRequest {
    if (data.plant) {
      return { ...data.plant, plantationDate: toDateInputValue(data.plant.plantationDate) };
    }

    return {
      gardenId: data.gardenId,
      plantName: '',
      species: '',
      plantType: 'flower',
      plantationDate: todayDateInputValue(),
      surfaceAreaRequired: 0,
      idealHumidityLevel: 0,
    };
  }

  protected handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    this.form().markAsTouched();

    if (this.form().invalid()) {
      return;
    }

    this.loading.set(true);
    const formData: CreatePlantRequest = this.formData();
    this.save.emit({ ...formData, plantationDate: toIsoDateTime(formData.plantationDate) });
  }
}
