import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { single } from 'rxjs/operators';
import { AuthData } from '../../auth-data.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  constructor() { }
 isPasswordsMismatched = false;
  ngOnInit(): void {
  }
  
  onSignUp(signUpForm : NgForm){
    if(signUpForm.invalid){
      return;
    }
    if(signUpForm.value.password1 ! = signUpForm.value.password2){
      this.isPasswordsMismatched =true;
      return
    }
    
    const authData= {} as AuthData;
    authData.email = signUpForm.value.email;
    authData.password = signUpForm.value.password1;
    console.log(JSON.stringify(authData));
  }

}
