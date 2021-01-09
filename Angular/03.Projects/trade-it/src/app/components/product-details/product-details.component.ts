import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { ProductService } from 'src/app/services/product.service';
import { NotifierService } from 'angular-notifier';
import { constants } from '../../constants/constants';
import { Product } from '../../models/product.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { FileService } from 'src/app/services/file.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss', '../../app.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  creator: User;
  isCreator: boolean = false;
  modalRef: BsModalRef;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private notifyService: NotifierService,
    private userService: UserService,
    private authService: AuthService,
    private fileService: FileService,
    private modalService: BsModalService
    ) { }
  
  //Makes an API call to the backend for a product depending on the route params.
  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params) => {
        let id = params['id'];
        this.productService.getProductById(id).subscribe(
        (product: Product) => {
          this.product = product;
          this.userService.getUserById(product._acl.creator).subscribe(
          (user: User) => {
            this.isCreator = this.authService.isCreator(this.userService.getUserId(), product._acl.creator);
            this.creator = user;
          },
          (error) => {
            this.notifyService.notify(constants.messageTypes.error, error.error.description);
          });
        },
        (error) => {
          this.notifyService.notify(constants.messageTypes.error, error.error.description);
        });
      }
    )
  }

  //Uploads a product picture.
  onFileSelected(event) {
    let file = event.target.files[0];

    if(file.type !== constants.fileTypes.jpeg &&
       file.type !== constants.fileTypes.jpg &&
       file.type !== constants.fileTypes.gif &&
       file.type !== constants.fileTypes.png
    ) {
        this.notifyService.notify(constants.messageTypes.error, constants.messages.invalidFileType);
        return;
      }
    
    if(file.size > constants.numerics.fileSize) {
      this.notifyService.notify(constants.messageTypes.error, constants.messages.invalidFileSize);
      return;
    }

    this.fileService.upload(file)
      .then((picture: string) => {
        this.product.picture = picture;
        this.productService.updateProduct(this.product).subscribe(
        (res) => {
          this.notifyService.notify(constants.messageTypes.success, constants.messages.uploadProductPicture);
        },
        (error) => {
          this.notifyService.notify(constants.messageTypes.error, error.error.description);
        }
      )
    });
  }

  //Shows the modal for product delete confirmation.
  onDelete(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
  
  //Executes the actual deletion.
  confirm() {
    this.modalRef.hide();
    this.productService.deleteProductById(this.product._id)
    .subscribe(
      (res) => {
        this.notifyService.notify(constants.messageTypes.success, constants.messages.productDelete);
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['products-list-my']));
      },
      (error) => {
        this.notifyService.notify(constants.messageTypes.error, error.error.description);
      }
    );
  }
  
  //Hides the modal when the user declines the produc deletion.
  decline() {
    this.modalRef.hide();
  }
}
