import { Post } from './../post.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

const backend_url = environment.apiUrl+'/posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private posts: Post[] = [];
  private postsUpdated  = new Subject<{newlyFetchedPosts:Post[],postCount:number}>();

  constructor( private httpClient :HttpClient , private router:Router) { }

  getPostsUpdatedlistenter(){
    return this.postsUpdated.asObservable();
  }

  createPost(Post :Post){
    this.httpClient.post(backend_url,Post).subscribe(resData =>{
      // console.log("image created successfully");
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
