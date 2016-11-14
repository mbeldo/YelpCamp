var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");
var middleware = require("../middleware");


//LANDING PAGE
router.get("/", function(req,res) {
    res.render("landing");
});



//REGISTER FORM
router.get("/register", function(req, res) {
    res.render("register");
});
//REGISTER SAVE ROUTE
router.post("/register", function(req, res) {
    
    var newUser =new User({username: req.body.username});
   User.register(newUser, req.body.password, function(error, user){
       if (error){
           return res.render("register", {error:error.message});
       }
       else
       {
           passport.authenticate("local")(req,res, function(){
               req.flash("success", "Welcome to YelpCamp " + req.body.username);
               res.redirect("/campgrounds");
           });
       }
   });
});

//LOGIN FORM ROUTE
router.get("/login", function(req, res) {
    res.render("login");
});

//LOGIN LOGIC
router.post("/login", passport.authenticate("local"), 
    function(req, res) {
    req.flash("success", "Logged you in as " + req.body.username);
    res.redirect(req.session.returnTo || '/');
    delete req.session.returnTo;
    req.session.returnTo = null;

});
//LOGOUT ROUTE
router.get("/logout", function(req, res) {
 req.logout();
 req.flash("success", "Logged you out.");
 res.redirect("/campgrounds");
});

router.get("*", function(req,res){
    req.flash("error", "Sorry, that page was not found");
    res.redirect("/campgrounds");
});

module.exports = router;