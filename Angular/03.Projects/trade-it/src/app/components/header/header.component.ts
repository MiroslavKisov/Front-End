import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { IUserAuth } from '../../interfaces/user-auth';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss', '../../app.component.scss']
})
export class HeaderComponent implements OnInit, DoCheck {

  isAuth: boolean = this.authService.isAuth();
  username: string = this.userService.getUsername();
  userId: string = this.userService.getUserId();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.userService.userAuth.subscribe(
      (userData: IUserAuth) => {
        this.username = userData.username;
        this.isAuth = userData.isAuth;
        this.userId = this.userService.getUserId();
      }
    )
  }

  //Updates the username after user update.
  ngDoCheck() {
    this.username = this.userService.getUsername();
  }

  onLogout() {
    this.userService.logout();
    this.router.navigate(['/home']);
  }

  //Searches the products
  search(form: NgForm) {
    if(!form.valid) {
      return;
    }

    let searchValue = form.value.name;

    this.router.navigate(['/products-list-search', searchValue]);

    form.reset();
  }
}
