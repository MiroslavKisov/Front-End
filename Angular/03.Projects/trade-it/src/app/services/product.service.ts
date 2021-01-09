import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Product } from '../models/product.model';
import { constants } from '../constants/constants';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private dataService: DataService,
    private notifyService: NotifierService,
    ) { }
  
  //Creates a new product
  createProduct(name: string, price: number, description: string, picture: string) {
    const product = new Product(name, price, description, '');

    this.dataService.post('appdata', 'products', product, 'kinvey')
    .subscribe(
      (res) => {
        this.notifyService.notify(constants.messageTypes.success, constants.messages.addedProduct);
      },
      (error) => {
        this.notifyService.notify(constants.messageTypes.error, error.error.description);
      },
    );
  }

  //Gets the products which has creator ID that differs the current user ID.
  getOtherProducts(userId: string) {
    return this.dataService.get('appdata', `products?query={"_acl.creator":{"$ne":"${userId}"}}`, 'kinvey');
  }

  //Gets the current user products.
  getMyProducts(userId: string) {
    return this.dataService.get('appdata', `products?query={"_acl.creator":"${userId}"}`, 'kinvey');
  }

  //Gets a product by ID.
  getProductById(productId: string) {
    return this.dataService.get('appdata', `products/${productId}`, 'kinvey');
  }

  //Updates a product.
  updateProduct(product: Product) {
    return this.dataService.put('appdata', `products/${product._id}`, product, 'kinvey');
  }

  //Deletes a product by ID.
  deleteProductById(productId: string) {
    return this.dataService.remove('appdata', `products/${productId}`, 'kinvey');
  }
}
