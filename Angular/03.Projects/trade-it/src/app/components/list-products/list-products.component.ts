import { Component, OnInit, OnDestroy, AfterViewInit, OnChanges, DoCheck } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { NotifierService } from 'angular-notifier';
import { LoadingService } from 'src/app/services/loading.service';
import { constants } from '../../constants/constants';
import { ActivatedRoute } from '@angular/router';
import { Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss', '../../app.component.scss']
})
export class ListProductsComponent implements OnInit, OnDestroy {

  products: Product[] = [];
  pages: number[] = [];
  isLoading: boolean = false;
  start: number = 0;
  end: number = constants.numerics.pageLen; //Controls the number of products per page.
  navStart: number = 0;
  navEnd: number = constants.numerics.navLen; //Controls the number of pages per page group.
  isFirst: boolean = false; // Attached to the prevPageGroup button and becomes true if this is the first page group.
  isLast: boolean = false; // Attached to the nextPageGroup button and becomes true if this is the last page group.
  isCreator: boolean = false;
  isSearch: boolean = false;
  searchValue : string = '';
  loadingSub: Subscription;
  sortedProducts: Product[];

  constructor(
    private productService: ProductService,
    private notifyService: NotifierService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private userService: UserService
    ) 
    { 
      //
      this.sortedProducts = this.products.slice();
    }

  ngOnInit() {
    
    //Subscribes to the loading service.
    this.loadingSub = this.loadingService.isLoading.subscribe(
      (loading) => {
        this.isLoading = loading;
      }
    )

    let route = this.activatedRoute.pathFromRoot[1].routeConfig.path;
    let userId = this.userService.getUserId();
    
    //Makes an API call to the back end depending on the route parameters.
    if(route === 'products-list') {
      this.productService.getOtherProducts(userId).subscribe(
        (products: Product[]) => {
          this.isCreator = false;
          this.products = products;
          this.sortedProducts = products;
          this.pages = this.getPages(this.sortedProducts);
        },
        (error) => {
          this.notifyService.notify(constants.messageTypes.error, error.error.description);
        }
      )
    } else if(route === 'products-list-my') {
      this.productService.getMyProducts(userId).subscribe(
        (products: Product[]) => {
          this.isCreator = true;
          this.products = products;
          this.sortedProducts = products;
          this.pages = this.getPages(this.sortedProducts);
        },
        (error) => {
          this.notifyService.notify(constants.messageTypes.error, error.error.description);
        }
      )
    } else if(route === 'products-list-search/:search') {
      
      this.activatedRoute.params.subscribe(
        (params) => {
          this.searchValue = params['search']
          let regex = new RegExp(this.searchValue, 'i');
          let filtered = [];
          this.productService.getOtherProducts(userId).subscribe(
            (products: Product[]) => {
              this.isCreator = false;
              this.isSearch = true;
              this.products = products;
              filtered = products.filter((p) => regex.test(p.name));
              this.sortedProducts = filtered;
              this.pages = this.getPages(this.sortedProducts);
            },
            (error) => {
              this.notifyService.notify(constants.messageTypes.error, error.error.description);
            }
          );
        }
      );
    }
  }

  ngOnDestroy() {
    this.loadingSub.unsubscribe();
  }

  //Displays the items from the selected page.
  selectPage(index: number) {
    this.start = index * constants.numerics.pageLen;
    this.end = this.start + constants.numerics.pageLen;
  }

  //Displays the next page group.
  nextPageGroup() {
    if(this.navEnd >= this.pages.length) {
      this.isLast = true;
      this.isFirst = false;
    } else {
      this.isLast = false;
      this.isFirst = false;
      this.navStart += constants.numerics.navLen;
      this.navEnd += constants.numerics.navLen;
    }
  }

  //Displays the previous page group.
  prevPageGroup() {
    if(this.navStart <= 0) {
      this.isLast = false;
      this.isFirst = true;
    } else {
      this.isLast = false;
      this.isFirst = false;
      this.navStart -= constants.numerics.navLen;
      this.navEnd -= constants.numerics.navLen;
    }
  }

  //Sorts the products in the table; 
  sortData(sort: Sort, arr: Product[]) {
    const data = arr.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedProducts = data;
      return;
    }

    this.sortedProducts = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'price': return this.compare(a.price, b.price, isAsc);
        default: return 0;
      }
    });
  }

  //Comparing function used for sorting the items in the table.
  private compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  //Gets the number of pages depending on the array count.
  private getPages(arr: Product[]) {
    let num = 0;

    if(arr.length % constants.numerics.pageLen !== 0) {
      num = Math.ceil(arr.length / constants.numerics.pageLen); 
    } else {
      num = arr.length / constants.numerics.pageLen;
    }

    return Array.apply(null, {length: num}).map(Number.call, Number);
  }
}
