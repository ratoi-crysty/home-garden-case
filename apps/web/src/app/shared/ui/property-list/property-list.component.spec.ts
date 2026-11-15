import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropertyListComponent } from './property-list.component';

describe('PropertyListComponent', () => {
  let fixture: ComponentFixture<PropertyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyListComponent);
  });

  it('should render values and fall back to the empty value', async () => {
    fixture.componentRef.setInput('items', [
      { label: 'Area', value: '10 m²', icon: 'square_foot' },
      { label: 'Location', value: undefined },
    ]);
    fixture.componentRef.setInput('emptyValue', 'n/a');
    await fixture.whenStable();
    const items = (fixture.nativeElement as HTMLElement).querySelectorAll('mat-list-item');

    expect(items).toHaveLength(2);
    expect(items[0].textContent).toContain('10 m²');
    expect(items[0].querySelector('mat-icon')?.textContent).toContain('square_foot');
    expect(items[1].textContent).toContain('n/a');
    expect(items[1].querySelector('mat-icon')).toBeNull();
  });
});
