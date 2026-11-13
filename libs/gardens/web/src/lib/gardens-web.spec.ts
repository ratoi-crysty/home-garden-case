import { TestBed } from '@angular/core/testing';

import { GardensWeb } from './gardens-web';

describe('GardensWeb', () => {
  let service: GardensWeb;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GardensWeb);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
