import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GardenModel } from '@itp-home-garden/api-interfaces';
import { GardenDetailsComponent } from './garden-details.component';

describe('GardenDetailsComponent', () => {
  let fixture: ComponentFixture<GardenDetailsComponent>;
  let element: HTMLElement;

  const garden: GardenModel = {
    gardenId: 5,
    gardenName: 'Orchard',
    totalSurfaceArea: 1250.5,
    locationDescription: 'Near the river',
    latitude: 44.4268,
    longitude: 26.1025,
    createdAt: '2026-03-04 12:30:00',
    updatedAt: '2026-03-05T08:00:00Z',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GardenDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GardenDetailsComponent);
    element = fixture.nativeElement as HTMLElement;
  });

  it('should render all garden properties', async () => {
    fixture.componentRef.setInput('garden', garden);
    await fixture.whenStable();
    const text = element.textContent ?? '';

    expect(element.querySelector('mat-card-title')?.textContent).toContain('Orchard');
    expect(text).toContain('1,250.5 m²');
    expect(text).toContain('Near the river');
    expect(text).toContain('44.4268, 26.1025');
    expect(text).toContain('Mar 4, 2026');
    expect(text).toContain('Mar 5, 2026');
  });

  it('should show placeholders for missing optional values', async () => {
    fixture.componentRef.setInput('garden', {
      ...garden,
      locationDescription: null,
      latitude: null,
      longitude: null,
    });
    await fixture.whenStable();

    const titles = [...element.querySelectorAll('[matListItemTitle]')].map((node: Element) =>
      node.textContent?.trim(),
    );
    expect(titles.filter((title: string | undefined) => title === '—')).toHaveLength(2);
  });
});
