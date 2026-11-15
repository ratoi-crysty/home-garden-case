import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GardenModel } from '@itp-home-garden/api-interfaces';
import { GardensListComponent } from './gardens-list.component';

const createGarden = (gardenId: number, gardenName: string): GardenModel => ({
  gardenId,
  gardenName,
  totalSurfaceArea: 10,
  locationDescription: `Location ${gardenId}`,
  createdAt: '2026-01-01 00:00:00',
  updatedAt: '2026-01-01 00:00:00',
});

describe('GardensListComponent', () => {
  let fixture: ComponentFixture<GardensListComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GardensListComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(GardensListComponent);
    fixture.componentRef.setInput('gardenLink', (garden: GardenModel) => ['/g', garden.gardenId]);
    element = fixture.nativeElement as HTMLElement;
  });

  it('should render the empty state and emit create', async () => {
    fixture.componentRef.setInput('gardens', []);
    const create = vi.fn();
    fixture.componentInstance.create.subscribe(create);
    await fixture.whenStable();

    element.querySelector<HTMLButtonElement>('app-empty-state button')?.click();

    expect(element.querySelector('app-empty-state')).toBeTruthy();
    expect(create).toHaveBeenCalledTimes(1);
  });

  it('should render one row per garden with link and summary', async () => {
    fixture.componentRef.setInput('gardens', [createGarden(1, 'North'), createGarden(2, 'South')]);
    await fixture.whenStable();

    const rows = element.querySelectorAll('app-gardens-list-row');
    expect(rows).toHaveLength(2);
    expect(rows[1].querySelector('a')?.getAttribute('href')).toBe('/g/2');
    expect(rows[1].textContent).toContain('South');
    expect(rows[1].textContent).toContain('Location 2');
    expect(element.querySelectorAll('mat-divider')).toHaveLength(1);
  });

  it('should emit edit and remove with the clicked garden', async () => {
    const garden = createGarden(1, 'North');
    const edit = vi.fn();
    const remove = vi.fn();
    fixture.componentInstance.edit.subscribe(edit);
    fixture.componentInstance.remove.subscribe(remove);
    fixture.componentRef.setInput('gardens', [garden]);
    await fixture.whenStable();

    element.querySelector<HTMLButtonElement>('button[aria-label="Edit North"]')?.click();
    element.querySelector<HTMLButtonElement>('button[aria-label="Delete North"]')?.click();

    expect(edit).toHaveBeenCalledWith(garden);
    expect(remove).toHaveBeenCalledWith(garden);
  });

  it('should disable row actions when disabled', async () => {
    fixture.componentRef.setInput('gardens', [createGarden(1, 'North')]);
    fixture.componentRef.setInput('disabled', true);
    await fixture.whenStable();

    const buttons = element.querySelectorAll<HTMLButtonElement>('app-gardens-list-row button');
    expect([...buttons].every((button: HTMLButtonElement) => button.disabled)).toBe(true);
  });
});
