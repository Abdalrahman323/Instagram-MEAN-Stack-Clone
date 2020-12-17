import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../post.model';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input('post') post :Post;

  constructor( private router:Router) { }

  ngOnInit(): void {

 
  }
  navigateToUser(userId:string){
  this.router.navigate(['/user/'+userId]);
  }

}
