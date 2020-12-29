import { Post } from './../post.model';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { map } from 'rxjs/operators';

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
        .pipe(map(postData =>{
          return { posts : postData.fetchedPosts.map(fetchedPost =>{

              return {
                id :fetchedPost._id,
                caption : fetchedPost.caption,
                postedBy : fetchedPost.postedBy,
                photo : fetchedPost.photo,
                isLiked : this.isLikedByUser(fetchedPost.likes),
                numberOfLikes : fetchedPost.likes.length

              }
          })
            ,
            maxPosts:postData.maxPosts


          }
        }))
         .subscribe( (mappedFetchedPosts) =>{

          // as no need to store posts in our case
          this.posts = [...this.posts, ...mappedFetchedPosts.posts];
          //this.posts = res.fetchedPosts;
          // console.log(this.posts);
         // this.checklikesOfPosts(res.fetchedPosts);

          this.postsUpdated.next({newlyFetchedPosts:[...mappedFetchedPosts.posts],postCount: mappedFetchedPosts.maxPosts});
    })
  }
  isLikedByUser(likes : Array<any>){
//const course = courses.find( course => course.name=== 'a');
    if( likes.find(userid => userid == this.authService.getUserId()) )
        return true

    else
        return false

  }

  likePost(PostId:string){
    const reqBody ={ postId : PostId , userId : this.authService.getUserId()}

    return this.httpClient.put(backend_url +'/like' , reqBody);
  }

  unlikePost (PostId:string){
    const reqBody = {postId :PostId , userId :this.authService.getUserId()}

    return this.httpClient.put(backend_url+ '/unlike',reqBody)

  }
}
