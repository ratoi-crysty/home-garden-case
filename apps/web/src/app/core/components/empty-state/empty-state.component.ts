import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

/**
 * Centered icon + title + message block for empty lists and error pages.
 * Call-to-action buttons are projected as default content.
 */
@Component({
  selector: 'app-empty-state',
  imports: [MatIcon],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmptyStateComponent {
  readonly title = input.required<string>();
  readonly icon = input<string>('info');
  readonly message = input<string>('');
}
