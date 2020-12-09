import { PostListComponent } from './posts/components/post-list/post-list.component';
import { CreatePostComponent } from './posts/components/create-post/create-post.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
{path:'',component:PostListComponent},
{path:'create',component:CreatePostComponent},
{path:"user",component:UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
