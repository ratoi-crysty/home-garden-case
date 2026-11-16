import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlantModel } from '@itp-home-garden/api-interfaces';
import { PlantListRowComponent } from './plant-list-row.component';

const plant: PlantModel = {
  plantId: 1,
  gardenId: 7,
  plantName: 'Cherry tomato',
  species: 'Solanum lycopersicum',
  plantType: 'vegetable',
  plantationDate: '2026-03-12T00:00:00.000Z',
  surfaceAreaRequired: 0.5,
  idealHumidityLevel: 60,
  createdAt: '2026-03-12 10:00:00',
  updatedAt: '2026-03-12 10:00:00',
};

describe('PlantListRowComponent', () => {
  let component: PlantListRowComponent;
  let fixture: ComponentFixture<PlantListRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantListRowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PlantListRowComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('plant', plant);
    fixture.componentRef.setInput('disabled', false);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
