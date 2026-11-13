import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  Signal,
} from '@angular/core';
import { GardensService } from './services/gardens-service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';
import { GardenModel } from '@itp-home-garden/gardens-types';

@Component({
  standalone: true,
  selector: 'lib-gardens-web',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './gardens-web.component.html',
  styleUrl: './gardens-web.component.css',
})
export class GardensWebComponent {
  protected readonly route = inject(ActivatedRoute);
  protected readonly gardensService = inject(GardensService);
  protected readonly data = toSignal(this.route.data as Observable<{ list: GardenModel[] }>, {
    requireSync: true,
  });
  protected readonly list: Signal<GardenModel[]> = computed(() => this.data().list);

  constructor() {
    effect(() => {
      console.log('List', { list: this.list(), data: this.data() });
    });
  }
}
