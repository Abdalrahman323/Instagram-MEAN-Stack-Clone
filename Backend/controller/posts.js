
const Post = require('../models/post')


exports.createPost = (req, res, next) => {

    const photoEncoded = req.body.photo;

    const post = new Post({
        title: "Hardcoded Image title",
        photo: photoEncoded,
        postedBy: req.body.postedBy
    });


    post.save().then((result) => {
        res.status(200).json({
            message: "post created Successfully"
        });
    }).catch((err) => {
        res.status(500).json({
            message: "Creating a post failed !"
        })
    });

}

exports.getPosts = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;

    let fetchedPosts = [];
    const postQuery = Post.find()
        .populate('postedBy', 'email')
        .sort('-createdAt');

    if (pageSize && currentPage) {
        postQuery
            .skip(pageSize * (currentPage - 1))  // page is one index
            .limit(pageSize)
    }

    postQuery.then(postsData => {

        postsData.map((item) => {
            fetchedPosts.push({
                _id: item.id,
                title: item.title,
                photo: item.photo,
                postedBy: {
                    name: item.postedBy.email,
                    id: item.postedBy._id
                },
                likes: item.likes,

            })
        })
        return Post.countDocuments();
    }).then(postsCount => {

        res.status(200).json({
            message: "posts fetched successfully",
            fetchedPosts: fetchedPosts,
            maxPosts: postsCount
        })
    })
}

exports.likePost = (req, res, next) => {
    // request payload 
    //  postId, userId
    Post.findByIdAndUpdate(
        req.body.postId,
        {
            $push: { likes: req.body.userId }
        },
        { new: true } // return the object after update is applied
        , function (err, result) {
            if (err) {
                res.status(500).json({
                    message: err
                })
            } else {
                res.status(200).json({
                    message: "post update successfully"
                })

            }
        }
    )
}

exports.unLikePost = (req, res, next) => {
    Post.findByIdAndUpdate(
        req.body.postId,
        {
            $pull: { likes: req.body.userId }
        },
        function (err, resut) {
            if (err) {
                res.status(500).json({
                    message: err
                })
            } else {
                res.status(200).json({
                    message: "post update successfully"
                })
            }
        }


    )
}