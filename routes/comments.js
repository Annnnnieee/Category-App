var express = require("express");
var router = express.Router({mergeParams: true});
var Gourd = require("../models/gourd");
var Comment = require("../models/comment");
//=====================================
//COMMENT ROUTES
//=====================================

router.get("/new", isLoggedIn , function(req, res){
    
   Gourd.findById(req.params.id, function(err, gourd){
       if(err){
           console.log(err);
       } else {
           res.render("comment/new", {gourd: gourd})
       }
   })
})
//create commment
router.post("/", isLoggedIn, function(req, res){
    Gourd.findById(req.params.id, function(err, gourd){
        if(err){
            console.log(err);
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    //add user name and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username; 
                    
                    //save comment
                    comment.save(); 
                    
                    gourd.comments.push(comment);//associating with current gourd
                    gourd.save(); //saving
                    console.log(comment);
                    res.redirect("/gourds/" + gourd._id);
                }
            })
        }
    })
})

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else
    res.redirect("/login");
}

module.exports = router; 
