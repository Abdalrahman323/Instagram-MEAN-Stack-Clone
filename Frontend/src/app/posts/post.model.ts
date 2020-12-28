export interface Post {
  id :string,
  title: string;
  photo: any;
  postedBy?:any;
  isLiked:boolean;
  numberOfLikes:number;
}
