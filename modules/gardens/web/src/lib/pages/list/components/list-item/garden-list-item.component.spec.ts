import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GardenListItemComponent } from './garden-list-item.component';

describe('GardenListItemComponent', () => {
  let component: GardenListItemComponent;
  let fixture: ComponentFixture<GardenListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GardenListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GardenListItemComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
