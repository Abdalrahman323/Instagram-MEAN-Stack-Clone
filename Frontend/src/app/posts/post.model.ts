export interface Post {
  id :string,
  caption: string;
  photo: any;
  postedBy?:any;
  isLiked:boolean;
  numberOfLikes:number;
}
