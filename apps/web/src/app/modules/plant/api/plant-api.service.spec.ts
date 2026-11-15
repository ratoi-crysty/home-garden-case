import { TestBed } from '@angular/core/testing';
import { PlantApiService } from './plant-api.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { API_BASE_PATH } from '../../../shared/api/api.const';

describe('PlantApiService', () => {
  let service: PlantApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_PATH, useValue: '/api' },
      ],
    });
    service = TestBed.inject(PlantApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
