


const express = require("express");
const mongoose = require("mongoose");
const app =express();
const postsRoutes = require('./routes/posts');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 3000;


//  Related to mongoDatabase
const URL = "mongodb://localhost:27017/instagram_db";
mongoose.connect(URL,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useFindAndModify:false
}).then(()=>{
  console.log('connected Successfully');
}).catch(()=>{
  console.log('Connection failed !!')
})

app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));


app.use("/api/posts",postsRoutes);

app.listen(PORT,()=>{
  console.log("Server in running on port" + PORT)
})