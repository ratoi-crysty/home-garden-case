import { TestBed } from '@angular/core/testing';
import { GardensListStore } from './gardens-list.store';

describe('GardensListStore', () => {
  let service: GardensListStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GardensListStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
