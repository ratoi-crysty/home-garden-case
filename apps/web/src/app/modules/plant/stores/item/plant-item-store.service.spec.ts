import { TestBed } from '@angular/core/testing';
import { PlantItemStoreService } from './plant-item-store.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { API_BASE_PATH } from '../../../../shared/api/api.const';

describe('PlantItemStoreService', () => {
  let service: PlantItemStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_PATH, useValue: '/api' },
        PlantItemStoreService,
      ],
    });
    service = TestBed.inject(PlantItemStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
