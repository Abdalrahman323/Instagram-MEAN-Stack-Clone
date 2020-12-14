import { Component, OnDestroy, OnInit } from '@angular/core';
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
  constructor(private authservice :AuthService) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authservice.getIsAuth();
    this.authStatusSubscription = this.authservice.getAuthStatusListener()
    .subscribe(authStaus => {
      // meaning there is an error
      if (!authStaus) {
        this.isAuthenticated = false;
      }else{
        this.isAuthenticated = true;
      }
    });
  }

  logOut(){
     this.authservice.logOut();
  }
ngOnDestroy(){
  this.authStatusSubscription.unsubscribe();
}
}
