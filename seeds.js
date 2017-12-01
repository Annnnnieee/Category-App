var mongoose = require("mongoose");
var Gourd = require("./models/gourd"); 
var Comment = require("./models/comment");

var data = [
    {
        name: "Galacian Pumpkin",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Cucurbita_maxima_Cabaza_GFDL.jpg/440px-Cucurbita_maxima_Cabaza_GFDL.jpg",
        description: "Good in soup"
    },
    {
        name: "Butternut Squash",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Cucurbita_moschata_Butternut_2012_G2.jpg/440px-Cucurbita_moschata_Butternut_2012_G2.jpg",
        description: "i'm a barbie girl in a barbie world"
    },
    {
        name: "Buttercup Squash",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Buttercupsquash.JPG/440px-Buttercupsquash.JPG",
        description: "you can brush my hair, undress me everywhere"
    }
    ]
//wow asynchrony at it's worst. had to put the foreach inside the callback otherwise it would
//delete shit after it added it. 
var seedDB = function(){
    Gourd.remove({}, function(err){
        // if(err){
        //     console.log(err);
        // } else {
        //     console.log("cleaned DB");
        // }
        
        // data.forEach(function(seed){
        //     Gourd.create(seed, function(err, gourd){
        //         if(err){
        //             console.log(err);
        //         } else {
        //             console.log("added gourd");
        //             //create comment
        //             Comment.create({
        //                 text: "hugs not drugs",
        //                 author: "Sir turpentine"
        //             }, function(err, comment){
        //                  if (err){
        //                     console.log(err);
        //                 } else {
        //                     gourd.comments.push(comment); // associate with 
        //                     gourd.save();
        //                     console.log("created comment");     
        //                 }
        //                 ////////////////////////////////
                        
        //                 //////////////
        //             })
        //         }
        //     })
        // });
    });
    
}



module.exports = seedDB; 
