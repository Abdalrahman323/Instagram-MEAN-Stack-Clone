const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title:{type:String, required:true},
    photo:{type:String, default:"no photo"}
},
{ timestamps: true }
);

module.exports = mongoose.model('Post',postSchema);