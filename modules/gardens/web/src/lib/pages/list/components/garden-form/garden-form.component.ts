import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { form, max, min, required, validate } from '@angular/forms/signals';
import { CreateGardenRequest, GardenModel } from '@itp-home-garden/gardens-types';
import { integerValidator } from '@itp-home-garden/validators';
import { InputNumberComponent, InputTextComponent } from '@itp-home-garden/fields';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { GardensListStore } from '../../../../stores/gardens-list.store';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

type NonNullableProps<T> = {
  [K in keyof T]-?: NonNullable<T[K]>;
};

@Component({
  selector: 'lib-garden-form',
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
  protected readonly store = inject(GardensListStore);
  protected readonly dialogRef = inject(MatDialogRef<GardenFormComponent>);
  protected readonly garden = inject<GardenModel | undefined>(MAT_DIALOG_DATA);
  protected readonly loading = toSignal(this.store.getIsLoading(), { requireSync: true });

  protected readonly formData = signal<NonNullableProps<CreateGardenRequest>>(
    this.getFormData(this.garden),
  );
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
      console.log('Error', this.form().invalid());
    }

    const save$ = this.garden
      ? this.store.update(this.garden.gardenId, this.formData())
      : this.store.create(this.formData());

    save$.pipe(switchMap(() => this.store.loadList())).subscribe({
      complete: () => {
        this.dialogRef.close();
      },
      error: () => {
        this.dialogRef.close();
      },
    });
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
