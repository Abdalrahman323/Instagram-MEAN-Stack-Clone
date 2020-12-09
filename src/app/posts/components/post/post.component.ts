import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Post } from '../../post.model';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input('post') post :Post;

  constructor( private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    // let TYPED_ARRAY = new Uint8Array(this.post.photo.data);
    // const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
    //   return data + String.fromCharCode(byte);
    //   }, '');
    // let base64String = btoa(STRING_CHAR);

     //this.post.photo= 'data:image/jpeg;base64,' + this.post.photo;
    // this.post.photo = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + this.post.photo);

  }

}
