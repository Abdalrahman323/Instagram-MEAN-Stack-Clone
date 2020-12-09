
const Post = require('../models/post')


exports.createPost =(req,res,next)=>{

   // const photoEncoded = req.body.encodedImage;

    const post = new Post({
        title:"Hardcoded Image title",
      //  photo: new Buffer.from(photoEncoded,"base64")
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