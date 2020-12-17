import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AngularSvgIconModule } from 'angular-svg-icon';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ScrollingModule} from '@angular/cdk/scrolling'
import { Ng2ImgMaxModule } from 'ng2-img-max';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CreatePostComponent } from './posts/components/create-post/create-post.component';
import { PostComponent } from './posts/components/post/post.component';
import { UserProfileComponent } from './user/components/user-profile/user-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { PostListComponent } from './posts/components/post-list/post-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/components/login/login.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreatePostComponent,
    PostComponent,
    UserProfileComponent,
    PostListComponent,
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularSvgIconModule.forRoot(),
    HttpClientModule,

    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ScrollingModule,
    Ng2ImgMaxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
