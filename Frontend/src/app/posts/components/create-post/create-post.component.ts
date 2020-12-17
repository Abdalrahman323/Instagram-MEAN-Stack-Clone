import { Post } from './../../post.model';
import { PostsService } from '../../services/posts.service';
import { Component, OnInit } from '@angular/core';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {

  uploadedImage: File;
  imagePreview: string;

  post = {} as Post;
  isLoading = false;



  constructor( private  postsService :PostsService ,
     private ng2ImgMax :Ng2ImgMaxService,
     public sanitizer: DomSanitizer ) { }

  ngOnInit(): void {
  }
  onImageChange(event :Event) {
    const image = (event.target as HTMLInputElement).files[0];
    const imageType =image.type;
    //console.log(imageType);

     const reader = new FileReader();

  
    this.ng2ImgMax.compressImage(image, 0.06).subscribe(  //  .06 mb  60kb
      result => {
        this.uploadedImage = new File([result], result.name,);
        //this.getImagePreview(this.uploadedImage);
        reader.onload=()=>{
          this.imagePreview = (reader.result)as string;
          this.imagePreview = "data:"+imageType+";"+this.imagePreview.substr(this.imagePreview.indexOf('base64'));
         // console.log(this.imagePreview);
        }
        reader.readAsDataURL(this.uploadedImage);
      },
      error => {
        console.log('😢 Oh no!', error);
      }
    );

  }

  onSavePost(){
    this.isLoading =true;
    this.post.photo = (this.imagePreview);
    this.postsService.createPost(this.post);


  }

}
