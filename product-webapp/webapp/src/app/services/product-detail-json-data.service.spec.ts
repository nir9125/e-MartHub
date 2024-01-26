import { TestBed } from '@angular/core/testing';

import { ProductDetailJsonDataService } from './product-detail-json-data.service';

describe('ProductDetailJsonDataService', () => {
  let service: ProductDetailJsonDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDetailJsonDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
