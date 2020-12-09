const express =require('express');

const PostsController = require('../controller/posts')
const router = express.Router();

router.post("",PostsController.createPost);



module.exports = router;