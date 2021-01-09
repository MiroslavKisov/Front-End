import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { NotifierService } from 'angular-notifier';
import { User } from 'src/app/models/user.model';
import { Rate } from 'src/app/models/rate.model';
import { constants } from '../../constants/constants';
import { FileService } from 'src/app/services/file.service';
import { Subscription } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss', '../../app.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  loadingSub: Subscription;
  isLoading: boolean = false;
  isCreator: boolean = false;
  isRated: boolean = false; //Used to show and hide the rating stars in the template.
  avgRating: any = 0;
  user: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authservice: AuthService,
    private fileService: FileService,
    private notifyService: NotifierService,
    private loadingService: LoadingService,
    ) { }

  ngOnInit() {

    this.loadingSub = this.loadingService.isLoading.subscribe(
      (loading) => {
        this.isLoading = loading;
      }
    )

    //Gets the current user by his ID.
    this.activatedRoute.params.subscribe(
      (params) => {
        let id = params['id'];
        let currentUserId = this.userService.getUserId();
        this.isCreator = this.authservice.isCreator(currentUserId, id);

        this.userService.getUserById(id).subscribe(
          (user: User) => {
            this.user = user;
            this.isRated = this.isUserRated(currentUserId);
            this.avgRating = this.getAverageRating(this.user.rating).toFixed(2);
          },
          (error) => {
            this.notifyService.notify(constants.messageTypes.error, error.error.description);
          }
        )
      }
    )
  }

  ngOnDestroy() {
    this.loadingSub.unsubscribe();
  }

  //Uploads profile picture
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
        this.user.picture = picture;
        this.userService.updateUser(this.user).subscribe(
        (res) => {
          this.notifyService.notify(constants.messageTypes.success, constants.messages.uploadPicture);
        },
        (error) => {
          this.notifyService.notify(constants.messageTypes.error, error.error.description);
        }
      )
    });
  }

  //Rates the user.
  onRate(rate: number) {
    let raterId = this.userService.getUserId();
    let rateObj = new Rate(rate, raterId);

    this.user.rating.push(rateObj);

    this.userService.updateUser(this.user)
    .subscribe(
      (res) => {
        this.notifyService.notify(constants.messageTypes.success, constants.messages.userRate);
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/profile', this.user._id]));
      },
      (error) => {
        this.notifyService.notify(constants.messageTypes.error, error.error.description);
      }
    )
  }

  //Gets the average rating score of the user.
  private getAverageRating(arr: Rate[]): number {
    if(arr.length === 0) {
      return 0;
    }

    return arr.reduce( ( a, b ) => a + b.rate, 0 ) / arr.length;
  }

  //Check if the user is rated already.
  private isUserRated(currentUserId): boolean {
    if(this.user.rating.some(r => r.raterId === currentUserId)) {
      return true;
    }

    return false;
  }
}
