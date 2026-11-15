import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BrokenPageComponent } from './broken-page.component';

describe('BrokenPageComponent', () => {
  let component: BrokenPageComponent;
  let fixture: ComponentFixture<BrokenPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrokenPageComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BrokenPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
