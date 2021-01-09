import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss', '../../app.component.scss']
})
export class CreateProductComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onCreate(form: NgForm) {
    if(!form.valid) {
      return;
    }

    const name = form.value.name;
    const price = Number(form.value.price);
    const description = form.value.description;
    const picture = ''

    this.productService.createProduct(name, price, description, picture);

    form.reset();

    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(['products-list-my']));
  }
}
