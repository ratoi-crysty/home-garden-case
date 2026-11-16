import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlantFormComponent, PlantFormData } from './plant-form.component';

describe('PlantFormComponent', () => {
  let component: PlantFormComponent;
  let fixture: ComponentFixture<PlantFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantFormComponent],
      providers: [
        {
          provide: MAT_DIALOG_DATA,
          useValue: { gardenId: 1, plant: undefined } satisfies PlantFormData,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlantFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
