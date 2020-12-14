const express = require('express')
const UserController = require('../controller/user')


const router = express.Router();
router.post("/signup",UserController.createUser);
router.post("/login",UserController.login);

 module.exports = router;
