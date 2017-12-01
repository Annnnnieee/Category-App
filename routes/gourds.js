var express = require("express");
var router = express.Router();
var Gourd = require("../models/gourd");
//home route
router.get("/", function(req, res){
        Gourd.find({}, function(err, gourds){
            if (err){
                console.log(err);
            } else {
                res.render("gourd/index", {gourds: gourds});
             }
        })
});

//post new gourd route
router.post("/", isLoggedIn, function(req,res){//post request following rest
    //get data from form and add to gourds aray
    var name = req.body.name; 
    var image = req.body.image;
    var desc = req.body.description; 
    var author = { id: req.user._id,
                   username: req.user.username
                }
    var newGourd = {name: name, image: image, description: desc, author: author};

    Gourd.create(newGourd, function(err, gourd){
        if(err){
            console.log(err);
        } else {
            console.log(newGourd);
            res.redirect("/gourds"); 
        }
    })
    
});

//new route - shows form to create new route
router.get("/new", isLoggedIn, function(req,res){
    res.render("gourd/new");
});

//Show route
router.get("/:id", function(req, res){
    var reqtemp = req.params.id
    console.log("before req: "+ req.params.id);
   Gourd.findById(reqtemp).populate("comments").exec(function(err, gourd){/////////////////////////
       if (err){
         console.log("afteR req: "+req.params.id)
         console.log("and req temp: " + reqtemp)
           console.log("--------the error" +err);
       } else {
           res.render("gourd/show", {gourd: gourd});
       }
    });
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else
    res.redirect("/login");
}

module.exports = router;