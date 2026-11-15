import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GardenListPageComponent } from './garden-list-page.component';

describe('GardenListPageComponent', () => {
  let component: GardenListPageComponent;
  let fixture: ComponentFixture<GardenListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GardenListPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GardenListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
