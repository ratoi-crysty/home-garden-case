import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GardensWebComponent } from './gardens-web.component';

describe('GardensWebComponent', () => {
  let component: GardensWebComponent;
  let fixture: ComponentFixture<GardensWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GardensWebComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GardensWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
