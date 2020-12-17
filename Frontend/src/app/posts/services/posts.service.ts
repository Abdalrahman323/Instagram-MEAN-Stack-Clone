import { Post } from './../post.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

const backend_url = environment.apiUrl+'/posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private posts: Post[] = [];
  private postsUpdated  = new Subject<{newlyFetchedPosts:Post[],postCount:number}>();

  constructor( private authService:AuthService, private httpClient :HttpClient , private router:Router) { }

  getPostsUpdatedlistenter(){
    return this.postsUpdated.asObservable();
  }

  createPost(Post :Post){
     Post.postedBy = this.authService.getUserId();
    this.httpClient.post(backend_url,Post).subscribe(resData =>{
      this.router.navigate(['/']);
    });
  }

  getPosts(postsPerPage:number, currentPageNumber:number){
    const queryParams =`?page=${currentPageNumber}&pagesize=${postsPerPage}`;
    
    this.httpClient.get<{message :string ,fetchedPosts: any  ,maxPosts:number}>
        (backend_url + queryParams)
         .subscribe(res =>{

          // as no need to store posts in our case
          this.posts = [...this.posts, ...res.fetchedPosts];
          //this.posts = res.fetchedPosts;
          // console.log(this.posts);

          this.postsUpdated.next({newlyFetchedPosts:[...res.fetchedPosts],postCount: res.maxPosts});
    })
  }

}
