import { PostsService } from './../../services/posts.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Post } from '../../post.model';

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  postsSupscription : Subscription;
  posts: Post[] = [];
  totalPosts =0;
  isLoading

  constructor( private postService : PostsService) { }

  ngOnInit(): void {

    this.isLoading = true;

    this.postService.getPosts();
    this.postsSupscription =  this.postService.getPostsUpdatedlistenter()
    .subscribe((postData:{posts:Post[],postCount:number})=>{
      this.posts = postData.posts;
      this.totalPosts = postData.postCount;
      this.isLoading = false;
    });
  }

}
