import { TestBed } from '@angular/core/testing';

import { CurrentCustomerRatingService } from './current-customer-rating.service';

describe('CurrentCustomerRatingService', () => {
  let service: CurrentCustomerRatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentCustomerRatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
