import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should render the app shell with title and navigation', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('mat-toolbar')?.textContent).toContain('Home Garden');
    expect(compiled.querySelector('nav a')?.textContent).toContain('Gardens');
    expect(compiled.querySelector('main router-outlet')).toBeTruthy();
  });
});
