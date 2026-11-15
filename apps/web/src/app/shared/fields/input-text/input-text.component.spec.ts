import { Injector, runInInjectionContext, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FieldTree, form } from '@angular/forms/signals';
import { InputTextComponent } from './input-text.component';

describe('InputTextComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputTextComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputTextComponent);
    const field: FieldTree<string> = runInInjectionContext(TestBed.inject(Injector), () =>
      form(signal<string>('')),
    );
    fixture.componentRef.setInput('field', field);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
