import { TestBed } from '@angular/core/testing';
import { ApiSwrService } from './api-swr.service';

describe('ApiSwrService', () => {
  let service: ApiSwrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiSwrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
