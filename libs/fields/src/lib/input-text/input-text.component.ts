import { Component, input } from '@angular/core';
import { FieldTree, FormField } from '@angular/forms/signals';
import { FormsModule } from '@angular/forms';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';

@Component({
  selector: 'lib-input-text',
  imports: [FormsModule, MatError, MatLabel, MatFormField, MatInput, FormField],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss',
})
export class InputTextComponent {
  readonly field = input.required<FieldTree<string>>();
  readonly type = input<'text' | 'email' | 'password'>('text');
  readonly label = input<string>('');
}
