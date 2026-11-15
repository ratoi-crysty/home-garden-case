import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { PageLayoutComponent } from './page-layout.component';

@Component({
  imports: [PageLayoutComponent],
  template: `
    <app-page-layout title="Title" subtitle="Sub" backLink="/home" [loading]="true">
      <button pageActions>Action</button>
      <p class="body">Body</p>
    </app-page-layout>
  `,
})
class HostComponent {}

describe('PageLayoutComponent', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    await fixture.whenStable();
  });

  it('should render header, back link, actions, body and progress', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent).toContain('Title');
    expect(element.querySelector('.subtitle')?.textContent).toContain('Sub');
    expect(element.querySelector('a[aria-label="Back"]')?.getAttribute('href')).toBe('/home');
    expect(element.querySelector('.actions button')?.textContent).toContain('Action');
    expect(element.querySelector('.body p.body')).toBeTruthy();
    expect(element.querySelector('mat-progress-bar')).toBeTruthy();
  });
});
