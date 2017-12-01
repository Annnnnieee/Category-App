var mongoose = require("mongoose"); 

//SCHEMA SETUP
var gourdSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [{//embedding coment ids
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
            }]
    });


var Gourd = mongoose.model("gourd", gourdSchema);
module.exports = Gourd;