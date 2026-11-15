import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { API_BASE_PATH } from './api.const';
import { CrudApiService } from './crud-api.service';

@Injectable()
class TestCrudApiService extends CrudApiService<unknown, unknown, unknown, number> {
  protected override readonly basePath = 'items';
}

describe('CrudApiService', () => {
  let service: TestCrudApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_BASE_PATH, useValue: '/api' },
        TestCrudApiService,
      ],
    });
    service = TestBed.inject(TestCrudApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
