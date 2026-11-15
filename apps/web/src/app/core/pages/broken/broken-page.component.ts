import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { EmptyStateComponent } from '../../components/empty-state/empty-state.component';

@Component({
  selector: 'app-broken-page',
  imports: [RouterLink, MatButton, MatIcon, EmptyStateComponent],
  templateUrl: './broken-page.component.html',
  styleUrl: './broken-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrokenPageComponent {}
