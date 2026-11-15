import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { NavItem } from './models/nav-item.model';

/**
 * Application frame: top toolbar with brand + navigation, and a centered content area
 * for the routed page (projected as default content).
 */
@Component({
  selector: 'app-shell',
  imports: [RouterLink, RouterLinkActive, MatToolbar, MatButton, MatIcon],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent {
  readonly title = input.required<string>();
  readonly icon = input<string>('');
  readonly homeLink = input<string>('/');
  readonly navItems = input<NavItem[]>([]);
}
