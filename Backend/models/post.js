const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    caption:{type:String, required:true},
    postedBy:{type: mongoose.Schema.Types.ObjectId , ref:"User" ,required:true},
    photo:{type:String, default:"no photo"},
    likes: [{type: mongoose.Schema.Types.ObjectId , ref:"User"}]
},
{ timestamps: true }
);

module.exports = mongoose.model('Post',postSchema);