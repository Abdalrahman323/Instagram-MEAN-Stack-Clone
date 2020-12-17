import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthData } from '../../auth-data.model';
import {AuthService} from'../../services/auth.service'
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private authService :AuthService) { }
 isPasswordsMismatched = false;
  ngOnInit(): void {
  }
  
  onSignUp(signUpForm : NgForm){
    if(signUpForm.invalid){
      return;
    }
    if( String (signUpForm.value.password1) !== String(signUpForm.value.password2)){
      this.isPasswordsMismatched = true;
            return
    }
    this.isPasswordsMismatched =false;
    
    const authData= {} as AuthData;
    authData.email = signUpForm.value.email;
    authData.password = btoa(signUpForm.value.password1);
    this.authService.createUser(authData)
  }

}
