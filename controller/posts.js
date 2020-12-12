
const Post = require('../models/post')


exports.createPost =(req,res,next)=>{

    const photoEncoded = req.body.photo;
    
    const post = new Post({
        title:"Hardcoded Image title",
        photo: photoEncoded
    });
    

    post.save().then((result) => {
            res.status(200).json({
                message: "post created Successfully"
            });
        }).catch((err)=>{
           res.status(500).json({
               message: "Creating a post failed !"
           })
        });

}

exports.getPosts=(req,res,next)=>{
    const pageSize= +req.query.pagesize;
    const currentPage= +req.query.page;

   let fetchedPosts = [];
   const postQuery = Post.find()
                         .sort('-createdAt');
   
   if(pageSize&&currentPage){
       postQuery
       .skip(pageSize*(currentPage-1))  // page is one index
       .limit(pageSize)
   }

   postQuery.then(postsData =>{

       postsData.map((item)=>{
        fetchedPosts.push({
               _id:item.id,
               title:item.title,
               photo:item.photo
           })
       })
    return Post.countDocuments();
   }).then(postsCount =>{
    
        res.status(200).json({
            message: "posts fetched successfully",
            fetchedPosts : fetchedPosts,
            maxPosts : postsCount
        })
   })
}