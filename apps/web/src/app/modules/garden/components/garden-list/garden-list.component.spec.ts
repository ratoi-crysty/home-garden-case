import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GardenModel } from '@itp-home-garden/api-interfaces';
import { GardenListComponent } from './garden-list.component';
import { GARDEN_NAVIGATION, GardenNavigation } from '../../garden.navigation';
import { TokenType } from '../../../../shared/injection/injection.types';

const mockedNavigation: GardenNavigation = {
  gardenList: () => ['/gardens'],
  gardenItem: (id: string) => ['/gardens', id],
  broken: () => ['/broken'],
  notFound: () => [`/notFound`],
};

const createGarden = (gardenId: number, gardenName: string): GardenModel => ({
  gardenId,
  gardenName,
  totalSurfaceArea: 10,
  locationDescription: `Location ${gardenId}`,
  createdAt: '2026-01-01 00:00:00',
  updatedAt: '2026-01-01 00:00:00',
});

describe('GardenListComponent', () => {
  let fixture: ComponentFixture<GardenListComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GardenListComponent],
      providers: [
        provideRouter([]),
        {
          provide: GARDEN_NAVIGATION,
          useValue: mockedNavigation satisfies TokenType<typeof GARDEN_NAVIGATION>,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GardenListComponent);
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

  it('should render one garden-list-row per garden with link and summary', async () => {
    fixture.componentRef.setInput('gardens', [createGarden(1, 'North'), createGarden(2, 'South')]);
    await fixture.whenStable();

    const rows = element.querySelectorAll('app-garden-list-row');
    expect(rows).toHaveLength(2);
    expect(rows[1].querySelector('a')?.getAttribute('href')).toBe('/gardens/2');
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

  it('should disable garden-list-row actions when disabled', async () => {
    fixture.componentRef.setInput('gardens', [createGarden(1, 'North')]);
    fixture.componentRef.setInput('disabled', true);
    await fixture.whenStable();

    const buttons = element.querySelectorAll<HTMLButtonElement>('app-garden-list-row button');
    expect([...buttons].every((button: HTMLButtonElement) => button.disabled)).toBe(true);
  });
});
