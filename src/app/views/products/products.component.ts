import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NavbarComponent, ProductCardComponent, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  private keyword: string | null = null;
  private apiBaseUrl: string = environment.api.url;
  
  products: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.keyword = params['keyword'];
      console.log(this.apiBaseUrl); 
      this.getProducts(this.keyword).subscribe(
        products => {
          this.products = products;
        },
        error => {
          console.error('Error al obtener productos:', error);
        }
      );
    });
  }

  getProducts(keyword: string | null): Observable<any> {
    if (!keyword || keyword.trim() === "") {
      console.log("Keyword está vacío, obteniendo todos los productos.");
      return this.http.get<any>(`${this.apiBaseUrl}/products`); 
    }
    return this.http.get<any>(`${this.apiBaseUrl}/products/search?keyword=${keyword}`); 
  }

  infoProduct(product: any){
    this.router.navigate(['product'], { queryParams: { productCode: product.code }})
  }
}
