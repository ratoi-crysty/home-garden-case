import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { API_BASE_PATH } from '../../../../shared/api/api.const';
import { GardenListStoreService } from './garden-list-store.service';

describe('GardenListStoreService', () => {
  let service: GardenListStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_PATH, useValue: '/api' },
        GardenListStoreService,
      ],
    });
    service = TestBed.inject(GardenListStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
