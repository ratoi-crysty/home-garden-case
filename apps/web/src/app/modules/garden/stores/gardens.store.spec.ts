import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { API_BASE_PATH } from '../../../shared/api/api.const';
import { GardensListStore } from './gardens-list.store';

describe('GardensListStore', () => {
  let service: GardensListStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_PATH, useValue: '/api' },
        GardensListStore,
      ],
    });
    service = TestBed.inject(GardensListStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
