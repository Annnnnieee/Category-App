var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose"); 
var Gourd = require("./models/gourd"); 
var Comment = require("./models/comment");
var seedDB = require("./seeds");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");


var commentRoutes = require("./routes/comments.js"),
    gourdRoutes = require("./routes/gourds.js"),
    indexRoutes = require("./routes/index");

//--- SETUP 
mongoose.connect("mongodb://localhost/gourds_2");
app.use(bodyParser.urlencoded({extended: true}));//hmmapp.use(express.static("public"));//so that we can serve custom style sheet?
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"))

//seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "anything",
    resave: false,
    saveUninitialized: false
    }));
    
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    return next();
})

app.use("/", indexRoutes);
app.use("/gourds", gourdRoutes);
app.use("/gourds/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("workinnnngggg");
});

