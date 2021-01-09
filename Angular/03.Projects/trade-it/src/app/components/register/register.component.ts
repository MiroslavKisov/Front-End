import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user.model';
import { Rate } from 'src/app/models/rate.model';
 
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../app.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if(!form.valid) {
      return;
    }

    const username = form.value.username;
    const email = form.value.email;
    const password = form.value.password;
    const repeatPassword = form.value.repeatPassword;
    const address = form.value.address;
    const phone = form.value.phone;
    const rating: Rate[] = [];
    const picture = '';

    let user = new User(username, email, password, address, phone, rating, picture);

    this.userService.register(user);

    form.reset();

    this.router.navigate(['']);
  }
}
