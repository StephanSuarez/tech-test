import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductSelectedCardComponent } from "../../components/product-selected-card/product-selected-card.component";
import { DashboardComponent } from '../../components/dashboard/dashboard.component';


@Component({
  selector: 'app-container',
  standalone: true,
  imports: [NavbarComponent, ProductSelectedCardComponent, DashboardComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {

}
