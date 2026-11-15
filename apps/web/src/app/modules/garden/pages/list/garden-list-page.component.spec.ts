import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { GardenModel } from '@itp-home-garden/api-interfaces';
import { GardenListStoreService } from '../../stores/list/garden-list-store.service';
import { API_BASE_PATH } from '../../../../shared/api/api.const';
import { GARDEN_NAVIGATION, GardenNavigation } from '../../garden.navigation';
import { GardenListPageComponent } from './garden-list-page.component';
import { TokenType } from '../../../../shared/injection/injection.types';

const mockedNavigation: GardenNavigation = {
  gardenList: () => ['/gardens'],
  gardenItem: (id: string) => ['/gardens', id],
  broken: () => ['/broken'],
  notFound: () => [`/notFound`],
};

class GardenListStoreStub implements Partial<GardenListStoreService> {
  readonly data$ = new BehaviorSubject<GardenModel[]>([]);

  getData(): Observable<GardenModel[]> {
    return this.data$;
  }

  refreshData(): Observable<void> {
    return of(undefined);
  }
}

describe('GardenListPageComponent', () => {
  let fixture: ComponentFixture<GardenListPageComponent>;
  let store: GardenListStoreStub;

  beforeEach(async () => {
    store = new GardenListStoreStub();

    await TestBed.configureTestingModule({
      imports: [GardenListPageComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_PATH, useValue: '/api' },
        {
          provide: GARDEN_NAVIGATION,
          useValue: mockedNavigation satisfies TokenType<typeof GARDEN_NAVIGATION>,
        },
        { provide: GardenListStoreService, useValue: store },
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
