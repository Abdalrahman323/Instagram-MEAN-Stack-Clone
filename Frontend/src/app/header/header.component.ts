import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,OnDestroy {

  authStatusSubscription:Subscription;
  isAuthenticated;
  userId;
  constructor(private authservice :AuthService ,private router:Router) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authservice.getIsAuth();
    this.userId = this.authservice.getUserId();

    this.authStatusSubscription = this.authservice.getAuthStatusListener()
    .subscribe(authStaus => {
      // meaning there is an error
      if (!authStaus) {
        this.isAuthenticated = false;
      }else{
        this.isAuthenticated = true;
        this.userId = this.authservice.getUserId();
      }
    });
  }

  toUserProfile(){
    this.router.navigate(['/user/'+ this.userId]);
  }

  logOut(){
     this.authservice.logOut();
  }
ngOnDestroy(){
  this.authStatusSubscription.unsubscribe();
}
}
