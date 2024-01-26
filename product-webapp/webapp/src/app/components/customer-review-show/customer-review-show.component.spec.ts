import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerReviewShowComponent } from './customer-review-show.component';

describe('CustomerReviewShowComponent', () => {
  let component: CustomerReviewShowComponent;
  let fixture: ComponentFixture<CustomerReviewShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerReviewShowComponent]
    });
    fixture = TestBed.createComponent(CustomerReviewShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
