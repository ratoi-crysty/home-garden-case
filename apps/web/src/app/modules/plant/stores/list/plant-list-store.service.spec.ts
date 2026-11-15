import { TestBed } from '@angular/core/testing';
import { PlantListStoreService } from './plant-list-store.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { API_BASE_PATH } from '../../../../shared/api/api.const';

describe('PlantListStoreService', () => {
  let service: PlantListStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_PATH, useValue: '/api' },
        PlantListStoreService,
      ],
    });
    service = TestBed.inject(PlantListStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
