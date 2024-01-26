import { TestBed } from '@angular/core/testing';

import { SimilarProductJsonDataService } from './similar-product-json-data.service';

describe('SimilarProductJsonDataService', () => {
  let service: SimilarProductJsonDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimilarProductJsonDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
