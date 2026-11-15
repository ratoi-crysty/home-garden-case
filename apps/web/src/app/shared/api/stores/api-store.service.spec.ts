import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { ApiStoreService } from './api-store.service';

@Injectable()
class TestApiStoreService extends ApiStoreService<string, number> {
  protected override readonly name = 'test';

  protected override getCacheKey(req: number): string {
    return `test/${req}`;
  }

  protected override fetchData(req: number): Observable<string> {
    return of(`value-${req}`);
  }
}

describe('ApiStoreService', () => {
  let service: TestApiStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestApiStoreService],
    });
    service = TestBed.inject(TestApiStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
