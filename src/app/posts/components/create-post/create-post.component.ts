import { Post } from './../../post.model';
import { PostsService } from '../../services/posts.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  encodedImg;
  post = {} as Post;
  isLoading = false;



  constructor( private  postsService :PostsService) { }

  ngOnInit(): void {
  }
  onImagePicked(event:Event){

     const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    // this fn will executed when done reading the file
    // it's async code , so we used callback fn asigned to onload
    reader.onload=()=>{
      this.encodedImg = reader.result
    }
    reader.readAsDataURL(file);
    //the result attribute contains the data as a data: URL representing the file's data as a base64 encoded string.

  }
  onSavePost(){
    this.isLoading =true;
    this.post.photo = this.encodedImg;
    this.postsService.createPost(this.post);


  }

}
