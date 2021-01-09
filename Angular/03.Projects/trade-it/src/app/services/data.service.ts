import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl: string = 'https://baas.kinvey.com';
  appId: string = '';
  appSecret: string = '';

  constructor(
    private http: HttpClient,
    private authService: AuthService
    ) { }

  //Sets the authentication headers depending on the authentication type.
  private setAuthHeaders(authorization) {
    if(authorization === 'basic') {
      return { 'Authorization': `Basic ${btoa(this.appId + ':' + this.appSecret)}`};
    } else if(authorization === 'kinvey') {
      return {'Authorization': `Kinvey ${this.authService.getAuthToken()}`};
    }
  }

  post(collection, endPoint, data, authorization) {
    return this.http.post(
        this.baseUrl + '/' + collection + '/' + this.appId + '/' + endPoint,
        data,
        {
          headers: new HttpHeaders(this.setAuthHeaders(authorization))
        }
    )
  }

  get(collection, endPoint, authorization)  {
    return this.http.get(
      this.baseUrl + '/' + collection + '/' + this.appId + '/' + endPoint,
      {
        headers: new HttpHeaders(this.setAuthHeaders(authorization))
      }
    )
  }

  put(collection, endPoint, data, authorization) {
    return this.http.put(
      this.baseUrl + '/' + collection + '/' + this.appId + '/' + endPoint,
      data,
      {
        headers: new HttpHeaders(this.setAuthHeaders(authorization))
      }
    )
  }

  remove(collection, endPoint, authorization) {
    return this.http.delete(
      this.baseUrl + '/' + collection + '/' + this.appId + '/' + endPoint,
      {
        headers: new HttpHeaders(this.setAuthHeaders(authorization))
      }
    )
  }
}
