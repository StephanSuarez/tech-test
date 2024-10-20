import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor( private router: Router ){}

  item: string = '';

  search() {
    console.log(this.item)
    if(this.item==''){
    console.log('0--',this.item)

      this.router.navigateByUrl('products');
      return
    }
    this.router.navigate(['products'], { queryParams: { keyword: this.item } });
  }
}
