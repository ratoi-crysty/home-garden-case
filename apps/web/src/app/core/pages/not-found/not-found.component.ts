import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { EmptyStateComponent } from '../../components/empty-state/empty-state.component';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink, MatButton, MatIcon, EmptyStateComponent],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
