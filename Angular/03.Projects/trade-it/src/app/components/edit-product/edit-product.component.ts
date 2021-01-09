import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { NotifierService } from 'angular-notifier';
import { constants } from '../../constants/constants';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss', '../../app.component.scss']
})
export class EditProductComponent implements OnInit {

  product: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private notifyService: NotifierService,
    private router: Router,
  ) { }

  ngOnInit() {

    let id =  this.activatedRoute.snapshot.params['id'];
    this.productService.getProductById(id).subscribe(
      (product : Product) => {
        this.product = product;
      },
      (error) => {
        this.notifyService.notify(constants.messageTypes.error, error.error.description);
      }
    )
  }


  onEdit(form: NgForm) {
    if(!form.valid) {
      return;
    }

    this.productService.updateProduct(this.product)
      .subscribe(
      (res) => {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/products-list-my', this.product._id]));
      },
      (error) => {
        this.notifyService.notify(constants.messageTypes.error, error.error.description);
      }
    );
  }
}
