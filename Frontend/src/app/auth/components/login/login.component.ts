import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthData } from '../../auth-data.model'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit ,OnDestroy {

  authStatusSubscription: Subscription
  isLoading = false;
  loginError = false;
  constructor(private authservice: AuthService) { }

  ngOnInit(): void {
    this.authStatusSubscription = this.authservice.getAuthStatusListener()
      .subscribe(authStaus => {
        // meaning there is an error
        if (!authStaus) {
          this.isLoading = false;
          this.loginError = true;
        }
      });
  }
  onLogin(loginForm: NgForm) {
    if (loginForm.invalid) {
      return;
    }
    const authData = {} as AuthData;
    authData.email = loginForm.value.email;
    authData.password = btoa(loginForm.value.password);

    this.isLoading = true;
    this.authservice.loginIn(authData);
  }

  ngOnDestroy(){
    this.authStatusSubscription.unsubscribe();
  }
}
