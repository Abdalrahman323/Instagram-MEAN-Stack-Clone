import { AuthService } from './../../../auth/services/auth.service';
import { PostsService } from './../../services/posts.service';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../post.model';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input('post') post: Post;

  isCaptionExpanded = false;

  constructor( public authService:AuthService,private postsService: PostsService, private router: Router) { }

  ngOnInit(): void {


  }
  navigateToUser(userId: string) {
    this.router.navigate(['/user/' + userId]);
  }

  expandCaption() {
    this.isCaptionExpanded = true;
  }

  toggleLike() {

    if (!this.post.isLiked) {
     console.log(this.post.id);

      this.postsService.likePost(this.post.id).subscribe(res => {
        this.post.isLiked = true;
        this.post.numberOfLikes++;
      })

    }
    else {
      this.postsService.unlikePost(this.post.id).subscribe(res => {
        this.post.isLiked = false;
        this.post.numberOfLikes--;

      });


    }



    // update in backend

  }

}
