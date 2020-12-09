const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title:{type:String, required:true},
    photo:{type:Buffer, default:"no photo"}
});

module.exports = mongoose.model('Post',postSchema);