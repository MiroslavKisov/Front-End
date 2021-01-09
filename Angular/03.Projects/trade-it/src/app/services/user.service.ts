import { Injectable, EventEmitter } from '@angular/core';
import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { IUserAuth } from '../interfaces/user-auth';
import { constants } from '../constants/constants';
import { User } from '../models/user.model';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  userAuth = new EventEmitter<IUserAuth>();

  constructor(
    private dataService: DataService, 
    private authService: AuthService,
    private notifyService: NotifierService,
    ) { }

  //Registers a new user.
  register(user: User) {
    this.dataService.post('user', '', user, 'basic')
      .subscribe(
        (res: IUserAuth) => {
          this.authService.saveSession(res);
          this.userAuth.emit({username: res.username, isAuth: true});
          this.notifyService.notify(constants.messageTypes.success, constants.messages.register);
          
        },
        (error) => {
          this.notifyService.notify(constants.messageTypes.error, error.error.description);
        }
      );
  }
  
  //Logs an existing user.
  login(username: string, password: string) {
    this.dataService.post('user', 'login', {username, password}, 'basic')
    .subscribe(
      (res: IUserAuth) => {
        this.authService.saveSession(res);
        this.userAuth.emit({username: res.username, isAuth: true});
        this.notifyService.notify(constants.messageTypes.success, constants.messages.login);
      },
      (error) => {
        this.notifyService.notify(constants.messageTypes.error, error.error.description);
      }
    )
  }

  //Logs out user
  logout() {
    this.dataService.post('user', '_logout', '', 'kinvey')
      .subscribe();
    sessionStorage.clear();
    this.userAuth.emit({username: '', isAuth: false});
    this.notifyService.notify(constants.messageTypes.success, constants.messages.logout);
  }

  //Gets user by ID;
  getUserById(userId: string) {
    return this.dataService.get('user', userId, 'kinvey');
  }

  //Returns the current user ID.
  getUserId() {
    return sessionStorage.getItem('userId');
  }

  //Returns the current user Username.
  getUsername() {
    return sessionStorage.getItem('username');
  }

  //Updates the current user.
  updateUser(user: User) {
    return this.dataService.put('user', user._id, user, 'kinvey');
  }
}
