import { Component, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';

@Component({
  selector: 'lib-input-number',
  imports: [MatError, MatFormField, MatInput, MatLabel, FormField],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.scss',
})
export class InputNumberComponent {
  readonly field = input.required<FieldTree<number>>();

  readonly label = input<string>('');
}
