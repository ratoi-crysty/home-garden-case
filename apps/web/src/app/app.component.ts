import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppShellComponent } from './core/components/app-shell/app-shell.component';

@Component({
  imports: [RouterOutlet, AppShellComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected readonly navItems = [{ label: 'Gardens', link: '/gardens', icon: 'yard' }];
}
