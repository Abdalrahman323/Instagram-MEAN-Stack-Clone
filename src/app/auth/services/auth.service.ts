import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthData } from '../auth-data.model';
const Backend_URL = environment.apiUrl + '/user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private isAuthenticated = false;

  private authStatusListener = new Subject<boolean>();


  constructor(private httpClient: HttpClient, private router: Router) { }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  private saveAuthData(token: string, expirationData: Date, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationData.toISOString());
    localStorage.setItem("userId", userId);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");

  }
  private setAuthTimer(duration: number) {

    this.tokenTimer = setTimeout(() => {
       this.logOut();
    }, duration * 1000);
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId =localStorage.getItem("userId");
    if (!token || !expirationDate)
      return;

    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }

  autoAuthenticateUser() {
    // to automatically authenticate the user ,
    // to fetch the date the authGuard needed  (isAuthenticated)
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    //  we need to check if the token still a valid one
    // we can't validate if it's a valid token that only can be done by the server
    // but at least we can tell if it's still valid from expiration perspective
    const now = new Date();

    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();

    if (expiresIn > 0) {  // still valid
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId

      this.authStatusListener.next(true);
      this.setAuthTimer(expiresIn / 1000);

    }
  }
  createUser(authData: AuthData) {
    this.httpClient.post(Backend_URL + '/signup', authData)
      .subscribe(() => {
        this.router.navigate(["/login"]);
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  loginIn(authData: AuthData) {

    this.httpClient.post<{ token: string, userId: string, expiresIn: number }>
      (Backend_URL + '/login', authData)
      .subscribe((response) => {

        this.token = response.token;
        if (this.token) {  // token sent from ther server
          this.isAuthenticated = true;
          this.userId = response.userId;

          const now = new Date();
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration)
          const expirationData = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(this.token, expirationData, this.userId);

          this.authStatusListener.next(true);
          this.router.navigate(['/']);
        }
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  logOut() {
    this.isAuthenticated = false;
    this.token = null;
    this.authStatusListener.next(false);
    this.userId = null;

    this.clearAuthData();

    this.router.navigate(['/']);

  }
}
