const express = require("express");
const mongoose = require("mongoose");
const app =express();
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || "3000";

const postsRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')


//const URL = `mongodb+srv://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.44hz6.mongodb.net/${process.env.MONGO_DB_Name}`;
//local connection
const URL = "mongodb://localhost:27017/instagram_db";


mongoose.connect(URL,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useFindAndModify:false
}).then(()=>{
  console.log(`connected Successfully to Database Url`);
}).catch(()=>{
  console.log('Connection failed !!')
})

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));

app.use("/api/posts",postsRoutes);
app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);


app.listen(PORT,()=>{
  console.log("Server in running on port " + PORT)
})

// Todo
// add auth route && controller
// understand populate mongoose
// add getUserInfo api to get posts of the user