import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductSelectedCardComponent } from '../../components/product-selected-card/product-selected-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NavbarComponent, ProductSelectedCardComponent, CommonModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  private code: string | null = null;
  private apiBaseUrl: string = environment.api.url;
  private containerCode: string = ''
  
  product: any = {};
  quantity: number = 1;
  totalCost: number = this.product.import_cost;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.code = params['productCode'];
      console.log('.000', this.code)
      this.getProduct(this.code).subscribe(
        product => {
          this.product = product[0];
          console.log(this.product)
        },
        error => {
          console.error('Error al obtener productos:', error);
        }
      );
    });
  }

  getProduct(code: string | null): Observable<any> {
    if (!code || code.trim() === "") {
      this.router.navigateByUrl('/products')
    }
    return this.http.get<any>(`${this.apiBaseUrl}/products/searchByCode?code=${code}`); 
  }

  incrementQuantity(): void {
    this.quantity++;
    this.updateTotal();
  }

  decrementQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.updateTotal();
    }
  }

  updateTotal(): void {
    this.totalCost = this.product.import_cost * this.quantity;
  }

  addToContainer(): void {
    let containerCode = localStorage.getItem('containerCode');
    
    if (containerCode) {
      let volumeProduct = this.product.liters * this.quantity;
      let productToAdd = {
        code: this.product.code,
        volume: volumeProduct
      };

      // Si el contenedor existe, hacemos el POST a la API
      this.http.patch(`${this.apiBaseUrl}/container/${containerCode}/products`, productToAdd).subscribe(
        response => {
          console.log(response);
          this.router.navigateByUrl('/container');
        },
        error => {
          console.error('Error al agregar producto al contenedor:', error);
        }
      );
    } else {
      let volumeProduct = this.product.liters * this.quantity;

      // Crear un contenedor nuevo con valores aleatorios
      let productToAddContainer = {
        code: this.generateRandomCode('C'),
        name: this.generateRandomName(), 
        length: this.generateRandomDimension(100, 200),
        width: this.generateRandomDimension(50, 150),  
        height: this.generateRandomDimension(50, 150),  
        maxVolume: this.generateRandomDimension(2000, 5000), 
        products: [
          {
            code: this.product.code,
            volume: volumeProduct
          }
        ],
        currentVolume: volumeProduct
      };

      this.http.post(`${this.apiBaseUrl}/container`, productToAddContainer).subscribe(
        response => {
          console.log(response);
          localStorage.setItem('containerCode', this.containerCode);
          this.router.navigateByUrl('/container');
        },
        error => {
          console.error('Error al crear contenedor:', error);
        }
      );
    }
  }
  
  generateRandomCode(prefix: string = 'C', length: number = 4): string {
    const randomNumbers = Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0');
    this.containerCode = `${prefix}${randomNumbers}` 
    return this.containerCode;
  }
  
  // Función para generar un nombre aleatorio para el contenedor
  generateRandomName(): string {
    const containerNames = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo']; // Lista de nombres aleatorios
    const randomIndex = Math.floor(Math.random() * containerNames.length);
    return `Contenedor ${containerNames[randomIndex]}`;
  }
  
  // Función para generar dimensiones aleatorias
  generateRandomDimension(min: number = 50, max: number = 150): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
