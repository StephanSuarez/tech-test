import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-selected-card',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-selected-card.component.html',
  styleUrl: './product-selected-card.component.css'
})
export class ProductSelectedCardComponent {
  quantity: number = 140;
  suggestedPrice: number = 6;

  decreaseQuantity() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }

  increaseQuantity() {
    this.quantity++;
  }
}
