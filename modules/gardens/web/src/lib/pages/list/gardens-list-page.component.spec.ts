import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GardensListPageComponent } from './gardens-list-page.component';

describe('GardensListPageComponent', () => {
  let component: GardensListPageComponent;
  let fixture: ComponentFixture<GardensListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GardensListPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GardensListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
