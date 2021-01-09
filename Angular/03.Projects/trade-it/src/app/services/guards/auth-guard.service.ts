import { Injectable } from '@angular/core';
import { 
  Router, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  CanActivate, 
  Route } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { NotifierService } from 'angular-notifier';
import { constants } from '../../constants/constants';

@Injectable({
  providedIn: 'root'
})
//Guards the route that are meant for authenticated users and redirects to the login page.
export class AuthGuardService implements CanActivate {

  constructor(
    private authService: AuthService, 
    private router: Router,
    private notifyService: NotifierService) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isAuth()) {
      return true;
    }

    this.router.navigate(['/login']);
    this.notifyService.notify(constants.messageTypes.error, constants.messages.notAuth);

    return false;
  }
}
