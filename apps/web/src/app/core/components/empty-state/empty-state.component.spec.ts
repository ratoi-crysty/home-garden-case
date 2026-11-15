import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmptyStateComponent } from './empty-state.component';

describe('EmptyStateComponent', () => {
  let fixture: ComponentFixture<EmptyStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmptyStateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EmptyStateComponent);
  });

  it('should render icon, title and message', async () => {
    fixture.componentRef.setInput('title', 'Nothing here');
    fixture.componentRef.setInput('icon', 'yard');
    fixture.componentRef.setInput('message', 'Add something');
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('mat-icon')?.textContent).toContain('yard');
    expect(element.querySelector('h2')?.textContent).toContain('Nothing here');
    expect(element.querySelector('p')?.textContent).toContain('Add something');
  });
});
