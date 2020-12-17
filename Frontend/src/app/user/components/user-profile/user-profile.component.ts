import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/posts/post.model';
import {UserService} from '../../services/user.service'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userId
  posts: Post[] = [];
  isLoading =false;

  constructor(private activatedRouter :ActivatedRoute , private userService :UserService) { }

  ngOnInit(): void {
    //this.productId = this.route.snapshot.paramMap.get('id');
   this.userId = this.activatedRouter.snapshot.paramMap.get('id');
   if(this.userId){
     this.getUserDateRequest();
   }
   
  }

  getUserDateRequest(){
    this.isLoading = true;
    this.userService.getUserData(this.userId)
    .subscribe((postData :any)=>{
      this.posts = postData.posts;
      this.isLoading = false;
    } )

  }

}
