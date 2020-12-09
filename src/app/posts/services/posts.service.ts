import { Post } from './../post.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

const backend_url = environment.apiUrl+'/posts';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private posts: Post[] = [];
  private postsUpdated  = new Subject<{posts:Post[],postCount:number}>();

  constructor( private httpClient :HttpClient) { }

  getPostsUpdatedlistenter(){
    return this.postsUpdated.asObservable();
  }

  createPost(Post :Post){
    this.httpClient.post(backend_url,Post).subscribe(resData =>{
      // console.log("image created successfully");
    });
  }

  getPosts(){
    this.httpClient.get<{message :string ,fetchedPosts: any  ,maxPosts:number}>(backend_url)
         .subscribe(res =>{
          this.posts = res.fetchedPosts;
          // console.log(this.posts);

          this.postsUpdated.next({posts:[...this.posts],postCount: res.maxPosts});
    })
  }

}
