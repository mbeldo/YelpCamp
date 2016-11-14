var express = require("express");
var router = express.Router();
var User = require("../models/user");
var passport = require("passport");
var middleware = require("../middleware");


//VIEW USER PROFILE
router.get("/user", middleware.isLoggedIn, function(req,res) {

    res.render("user/user");
});

//EDIT PROFILE PAGE FORM
router.get("/user/edit", middleware.isLoggedIn, function(req,res) {
    User.findById(req.user._id, function(err, foundUser){
        if(err){
            console.log(err);
        }
        else
        {
                res.render("user/edit", {currentUser:foundUser});
        }
    })

});

router.put("/user/edit", middleware.isLoggedIn, function(req,res){
    User.findByIdAndUpdate(req.user._id, req.body.user, function(error, updatedCampground){
        if (error){
            console.log(error);
            req.flash("error", error.message);
            res.redirect("/user/edit");
        }
        else{
            req.flash("success", "Your profile was updated");
            res.redirect("/user");
        }
    });
});

module.exports = router;