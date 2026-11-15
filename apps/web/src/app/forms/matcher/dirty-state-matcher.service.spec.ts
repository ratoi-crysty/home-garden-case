import { TestBed } from '@angular/core/testing';
import { DirtyStateMatcherService } from './dirty-state-matcher.service';

describe('DirtyStateMatcherService', () => {
  let service: DirtyStateMatcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirtyStateMatcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
