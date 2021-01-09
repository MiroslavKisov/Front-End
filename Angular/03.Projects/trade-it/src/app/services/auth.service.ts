import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  //Check if the user is authenticated.
  isAuth(): boolean {
    return sessionStorage.getItem('authtoken') !== null;
  }
  
  //Checks if the user is creator of the current product.
  isCreator(currentUserId: string, creatorId: string) : boolean {
    return currentUserId === creatorId;
  }

  //Saves the response data to the sessin storage.
  saveSession(res) {
    sessionStorage.setItem('username', res.username);
    sessionStorage.setItem('authtoken', res._kmd.authtoken);
    sessionStorage.setItem('userId', res._id);
  }

  //Returns the authentication token for the current user.
  getAuthToken() {
    return sessionStorage.getItem('authtoken');
  }
}
