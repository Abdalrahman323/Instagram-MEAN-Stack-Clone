import { PostListComponent } from './posts/components/post-list/post-list.component';
import { CreatePostComponent } from './posts/components/create-post/create-post.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user/components/user-profile/user-profile.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignUpComponent } from './auth/components/sign-up/sign-up.component';
import {AuthGuardService} from './auth/services/auth-guard.service'

const routes: Routes = [
{path:'',component:PostListComponent},
{path:'create',component:CreatePostComponent,canActivate:[AuthGuardService]},
{path:"user/:id",component:UserProfileComponent,canActivate:[AuthGuardService]},
{path:"login",component:LoginComponent},
{path:"signup",component:SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
