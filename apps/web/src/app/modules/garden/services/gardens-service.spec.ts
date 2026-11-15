import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { API_BASE_PATH } from '../../../shared/api/api.const';
import { GardensService } from './gardens-service';

describe('GardensService', () => {
  let service: GardensService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_PATH, useValue: '/api' },
      ],
    });
    service = TestBed.inject(GardensService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
