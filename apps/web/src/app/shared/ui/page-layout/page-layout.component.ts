import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatTooltip } from '@angular/material/tooltip';

export type PageBackLink = string | unknown[];

/**
 * Standard page frame: optional back link, title/subtitle, an actions slot
 * (`[pageActions]`) and the page body (default content).
 */
@Component({
  selector: 'app-page-layout',
  imports: [RouterLink, MatIconButton, MatIcon, MatProgressBar, MatTooltip],
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLayoutComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>('');
  readonly backLink = input<PageBackLink>();
  readonly backLabel = input<string>('Back');
  readonly loading = input<boolean>(false);
}
