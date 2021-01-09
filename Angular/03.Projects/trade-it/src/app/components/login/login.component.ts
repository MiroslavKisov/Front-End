import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../app.component.scss']
})
export class LoginComponent implements OnInit {

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
    const password = form.value.password;

    this.userService.login(username, password);

    form.reset();

    this.router.navigate(['']);
  }
}
