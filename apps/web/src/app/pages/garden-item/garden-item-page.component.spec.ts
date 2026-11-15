import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { GardenModel, PlantModel } from '@itp-home-garden/api-interfaces';
import { GardenItemPageComponent } from './garden-item-page.component';
import { GARDEN_NAVIGATION, GardenNavigation } from '../../modules/garden/garden.navigation';
import { GardenItemStoreService } from '../../modules/garden/stores/item/garden-item-store.service';
import { PlantListStoreService } from '../../modules/plant/stores/list/plant-list-store.service';

const mockedNavigation: GardenNavigation = {
  gardenList: () => ['/gardens'],
  gardenItem: (id: string) => ['/gardens', id],
  broken: () => ['/broken'],
  notFound: () => [`/notFound`],
};

describe('GardenItemPageComponent', () => {
  const garden: GardenModel = {
    gardenId: 7,
    gardenName: 'Backyard',
    totalSurfaceArea: 42,
    locationDescription: 'Behind the house',
    latitude: 44.43,
    longitude: 26.1,
    createdAt: '2026-01-02 10:00:00',
    updatedAt: '2026-01-03 10:00:00',
  };
  const plants: PlantModel[] = [];
  let fixture: ComponentFixture<GardenItemPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GardenItemPageComponent],
      providers: [
        provideRouter([]),
        {
          provide: GARDEN_NAVIGATION,
          useValue: mockedNavigation,
        },
        {
          provide: GardenItemStoreService,
          useValue: { getData: () => of(garden) } satisfies Partial<GardenItemStoreService>,
        },
        {
          provide: PlantListStoreService,
          useValue: { getData: () => of(plants) } satisfies Partial<PlantListStoreService>,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GardenItemPageComponent);
    await fixture.whenStable();
  });

  it('should render the resolved garden', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent).toContain('Backyard');
    expect(element.querySelector('app-garden-details')?.textContent).toContain('Behind the house');
    expect(element.querySelector('a[aria-label="Back to gardens"]')?.getAttribute('href')).toBe(
      '/gardens',
    );
  });
});
