
const User = require('../models/user');
const Post = require('../models/post')

exports.getUserDate = (req , res ,next )=>{
    
    let fetchedPosts = [];
    const query = User.findOne({_id:req.params.id})
    User.findOne({_id:req.params.id})
        .select('_id')
        .then(user =>{
             Post.find({postedBy: user._id})
              .select('photo title')
              .then(posts =>{
                fetchedPosts = posts;
                res.status(200).json({
                  posts:fetchedPosts
                })
              })
    
        })
}