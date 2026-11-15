import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { API_BASE_PATH } from '../../../shared/api/api.const';
import { GardenApiService } from './garden-api.service';

describe('GardenApiService', () => {
  let service: GardenApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_PATH, useValue: '/api' },
      ],
    });
    service = TestBed.inject(GardenApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
