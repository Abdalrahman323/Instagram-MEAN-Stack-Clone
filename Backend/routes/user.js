const express = require('express')
const UserController = require('../controller/user')


 const router = express.Router();
router.get("/:id",UserController.getUserDate);
//router.post("/login",UserController.login);

 module.exports = router;
