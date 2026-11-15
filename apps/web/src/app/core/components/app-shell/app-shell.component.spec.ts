import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppShellComponent } from './app-shell.component';

describe('AppShellComponent', () => {
  let fixture: ComponentFixture<AppShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppShellComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(AppShellComponent);
  });

  it('should render brand and navigation links', async () => {
    fixture.componentRef.setInput('title', 'My App');
    fixture.componentRef.setInput('navItems', [
      { label: 'One', link: '/one', icon: 'looks_one' },
      { label: 'Two', link: '/two' },
    ]);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const links = element.querySelectorAll('nav a');

    expect(element.querySelector('.brand')?.textContent).toContain('My App');
    expect(links).toHaveLength(2);
    expect(links[1].getAttribute('href')).toBe('/two');
  });

  it('should not render navigation when there are no items', async () => {
    fixture.componentRef.setInput('title', 'My App');
    await fixture.whenStable();

    expect((fixture.nativeElement as HTMLElement).querySelector('nav')).toBeNull();
  });
});
