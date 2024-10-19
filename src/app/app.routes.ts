import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { ProductsComponent } from './views/products/products.component';
import { ProductComponent } from './views/product/product.component';
import { ContainerComponent } from './views/container/container.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'product', component: ProductComponent },
  { path: 'container', component: ContainerComponent },
];
