import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { GardenModel } from '@itp-home-garden/api-interfaces';
import { GardensListStore } from '../../stores/gardens-list.store';
import { GARDEN_BASE_PATH } from '../../garden.navigation';
import { GardenListPageComponent } from './garden-list-page.component';

class GardensListStoreStub implements Partial<GardensListStore> {
  readonly data$ = new BehaviorSubject<GardenModel[]>([]);
  readonly loading$ = new BehaviorSubject<boolean>(false);

  getData(): Observable<GardenModel[]> {
    return this.data$;
  }

  getIsLoading(): Observable<boolean> {
    return this.loading$;
  }
}

describe('GardenListPageComponent', () => {
  let fixture: ComponentFixture<GardenListPageComponent>;
  let store: GardensListStoreStub;

  beforeEach(async () => {
    store = new GardensListStoreStub();

    await TestBed.configureTestingModule({
      imports: [GardenListPageComponent],
      providers: [
        provideRouter([]),
        { provide: GARDEN_BASE_PATH, useValue: '/gardens' },
        { provide: GardensListStore, useValue: store },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GardenListPageComponent);
  });

  it('should show the empty state when there are no gardens', async () => {
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('app-empty-state')?.textContent).toContain('No gardens yet');
    expect(element.querySelector('[pageActions]')).toBeNull();
  });

  it('should list gardens linking to their item page', async () => {
    store.data$.next([
      {
        gardenId: 3,
        gardenName: 'Rooftop',
        totalSurfaceArea: 12,
        createdAt: '2026-01-01 00:00:00',
        updatedAt: '2026-01-01 00:00:00',
      },
    ]);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('[pageActions]')?.textContent).toContain('New garden');
    expect(element.querySelector('app-gardens-list-row a')?.getAttribute('href')).toBe(
      '/gardens/3',
    );
  });
});
