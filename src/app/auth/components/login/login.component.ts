import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {AuthData} from '../../auth-data.model'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onLogin(loginForm : NgForm){
    const authData= {} as AuthData;
    authData.email = loginForm.value.email;
    authData.password = loginForm.value.password;

  }
}
