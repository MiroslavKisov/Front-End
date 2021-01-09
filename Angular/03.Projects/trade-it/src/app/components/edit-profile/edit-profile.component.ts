import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NotifierService } from 'angular-notifier';
import { User } from 'src/app/models/user.model';
import { NgForm } from '@angular/forms';
import { constants } from '../../constants/constants';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss', '../../app.component.scss']
})
export class EditProfileComponent implements OnInit {

  user: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private notifyService: NotifierService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    let userId: string = this.activatedRoute.snapshot.pathFromRoot[1].params['id'];

    this.userService.getUserById(userId).subscribe(
      (user: User) => {
        this.user = user;
      }
    )
  }

  onEdit(form: NgForm) {
    if(!form.valid) {
      return;
    }

    this.userService.updateUser(this.user).subscribe(
      (user: User) => {
        sessionStorage.clear();
        this.authService.saveSession(user);
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['profile', user._id]));
        this.notifyService.notify(constants.messageTypes.success, constants.messages.profileUpdate);
        form.reset();
      },
      (error) => {
        this.notifyService.notify(constants.messageTypes.error, error.error.description);
      }
    );
  }
}
