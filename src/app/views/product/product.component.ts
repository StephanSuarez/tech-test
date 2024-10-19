import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductSelectedCardComponent } from '../../components/product-selected-card/product-selected-card.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NavbarComponent, ProductSelectedCardComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

}
