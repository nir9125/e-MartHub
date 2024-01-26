import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsOfSellerComponent } from './products-of-seller.component';

describe('ProductsOfSellerComponent', () => {
  let component: ProductsOfSellerComponent;
  let fixture: ComponentFixture<ProductsOfSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsOfSellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsOfSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
