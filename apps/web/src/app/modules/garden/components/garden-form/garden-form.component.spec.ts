import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GardenFormComponent } from './garden-form.component';

describe('GardenFormComponent', () => {
  let component: GardenFormComponent;
  let fixture: ComponentFixture<GardenFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GardenFormComponent],
      providers: [{ provide: MAT_DIALOG_DATA, useValue: undefined }],
    }).compileComponents();

    fixture = TestBed.createComponent(GardenFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
