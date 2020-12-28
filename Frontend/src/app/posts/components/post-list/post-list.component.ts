import { PostsService } from './../../services/posts.service';
import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../../post.model';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { filter, map, pairwise, throttleTime } from 'rxjs/operators'
import { timer } from 'rxjs';
@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit ,AfterViewInit {

  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;
  @ViewChild('postElement') elementView: ElementRef;


  private postsPerPage = 2;
  private currentPageNumber =1;

  curItemSize = 614;

  postsSupscription: Subscription;
  posts: Post[] = [];
  totalPosts = 0;
  isLoading

  constructor(private postService: PostsService ,private ngZone: NgZone) { }


  ngOnInit(): void {

    this.isLoading = true;

    this.postService.getPosts(this.postsPerPage,this.currentPageNumber);
    this.postsSupscription = this.postService.getPostsUpdatedlistenter()
      .subscribe((postData: { newlyFetchedPosts: Post[], postCount: number }) => {
        this.posts = [...this.posts, ...postData.newlyFetchedPosts];
        this.totalPosts = postData.postCount;
        this.isLoading = false;
      });
  }
  ngAfterViewInit(): void {
    this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
      throttleTime(200)
    ).subscribe(() => {
      this.ngZone.run(() => {
        this.fetchMorePosts();

      });
    }
    );

  }

  fetchMorePosts(){
    if(this.isThereMorePosts()){
      this.currentPageNumber ++;
     // timer(1000).subscribe(()=>{
        this.postService.getPosts(this.postsPerPage,this.currentPageNumber);
     //});
    }
  }


  isThereMorePosts():boolean{
    return (this.currentPageNumber)* this.postsPerPage <  this.totalPosts;
  }


}
