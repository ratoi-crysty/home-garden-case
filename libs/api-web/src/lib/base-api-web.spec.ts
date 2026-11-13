import { TestBed } from '@angular/core/testing';

import { BaseApiWeb } from './base-api-web';

describe('BaseApiWeb', () => {
  let service: BaseApiWeb;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseApiWeb);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
