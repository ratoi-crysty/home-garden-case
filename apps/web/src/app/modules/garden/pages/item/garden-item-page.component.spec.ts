import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GardenItemPageComponent } from './garden-item-page.component';

describe('GardenItemPageComponent', () => {
  let component: GardenItemPageComponent;
  let fixture: ComponentFixture<GardenItemPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GardenItemPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GardenItemPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
