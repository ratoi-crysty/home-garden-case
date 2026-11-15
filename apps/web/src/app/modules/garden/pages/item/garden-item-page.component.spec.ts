import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { GardenModel } from '@itp-home-garden/api-interfaces';
import { GARDEN_BASE_PATH } from '../../garden.navigation';
import { GardenItemPageComponent } from './garden-item-page.component';

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
  let fixture: ComponentFixture<GardenItemPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GardenItemPageComponent],
      providers: [
        provideRouter([]),
        { provide: GARDEN_BASE_PATH, useValue: '/gardens' },
        { provide: ActivatedRoute, useValue: { data: of({ garden }) } },
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
