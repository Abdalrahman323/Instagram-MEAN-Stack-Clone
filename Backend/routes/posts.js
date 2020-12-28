const express =require('express');

const PostsController = require('../controller/posts')
const router = express.Router();

router.post("",PostsController.createPost);
router.get("",PostsController.getPosts);

router.put("/like", PostsController.likePost )
router.put("/unlike",PostsController.unLikePost);



module.exports = router;