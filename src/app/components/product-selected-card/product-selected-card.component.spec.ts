import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSelectedCardComponent } from './product-selected-card.component';

describe('ProductSelectedCardComponent', () => {
  let component: ProductSelectedCardComponent;
  let fixture: ComponentFixture<ProductSelectedCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSelectedCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSelectedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
