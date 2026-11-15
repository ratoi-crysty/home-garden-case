import { ChangeDetectionStrategy, Component, effect, inject, output, signal } from '@angular/core';
import { form, max, min, required, validate } from '@angular/forms/signals';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateGardenRequest, GardenModel } from '@itp-home-garden/api-interfaces';
import { InputTextComponent } from '../../../../shared/fields/input-text/input-text.component';
import { InputNumberComponent } from '../../../../shared/fields/input-number/input-number.component';
import { integerValidator } from '../../../../shared/validators/integer.validator';

type NonNullableProps<T> = {
  [K in keyof T]-?: NonNullable<T[K]>;
};

@Component({
  selector: 'app-garden-form',
  imports: [
    InputTextComponent,
    InputNumberComponent,
    MatButton,
    MatCard,
    MatCardHeader,
    MatCardContent,
  ],
  templateUrl: './garden-form.component.html',
  styleUrl: './garden-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GardenFormComponent {
  protected readonly garden = inject<GardenModel | undefined>(MAT_DIALOG_DATA);
  protected readonly loading = signal<boolean>(false);

  protected readonly formData = signal<NonNullableProps<CreateGardenRequest>>(
    this.getFormData(this.garden),
  );

  save = output<CreateGardenRequest>();

  protected readonly form = form<NonNullableProps<CreateGardenRequest>>(
    this.formData,
    (schemaPath) => {
      required(schemaPath.gardenName, { message: 'Input is required' });
      required(schemaPath.totalSurfaceArea);
      validate(schemaPath.totalSurfaceArea, integerValidator);
      min(schemaPath.latitude, -90);
      max(schemaPath.latitude, 90);
      min(schemaPath.longitude, -180);
      max(schemaPath.longitude, 180);
    },
  );

  constructor() {
    effect(() => {
      this.formData.set(this.formData());
    });
  }

  handleSubmit(event: SubmitEvent) {
    event.preventDefault();

    if (this.form().invalid()) {
      return;
    }

    this.loading.set(true);
    this.save.emit(this.formData());
  }

  cancelLoading() {
    this.loading.set(false);
  }

  protected getFormData(garden: GardenModel | undefined): NonNullableProps<CreateGardenRequest> {
    return {
      ...garden,
      totalSurfaceArea: garden?.totalSurfaceArea ?? 0,
      gardenName: garden?.gardenName ?? '',
      locationDescription: garden?.locationDescription ?? '',
      latitude: garden?.latitude ?? 0,
      longitude: garden?.longitude ?? 0,
    };
  }
}
