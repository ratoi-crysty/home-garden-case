import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlantListComponent } from './plant-list.component';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { PlantListStoreService } from '../../stores/list/plant-list-store.service';
import { PLANT_NAVIGATION, PlantNavigation } from '../../plant.navigation';

const mockedNavigation: PlantNavigation = {
  plantList: () => ['/plants'],
  plantItem: (id: string) => ['/plants', id],
  broken: () => ['/broken'],
  notFound: () => [`/notFound`],
};

describe('PlantListComponent', () => {
  let component: PlantListComponent;
  let fixture: ComponentFixture<PlantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantListComponent],
      providers: [
        provideRouter([]),
        {
          provide: PLANT_NAVIGATION,
          useValue: mockedNavigation,
        },
        {
          provide: PlantListStoreService,
          useValue: { getData: () => of([]) } satisfies Partial<PlantListStoreService>,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlantListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('plants', []);
    fixture.componentRef.setInput('disabled', false);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
