import { Injector, runInInjectionContext, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldTree, form } from '@angular/forms/signals';
import { InputNumberComponent } from './input-number.component';

describe('InputNumberComponent', () => {
  let component: InputNumberComponent;
  let fixture: ComponentFixture<InputNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputNumberComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputNumberComponent);
    const field: FieldTree<number> = runInInjectionContext(TestBed.inject(Injector), () =>
      form(signal<number>(0)),
    );
    fixture.componentRef.setInput('field', field);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
