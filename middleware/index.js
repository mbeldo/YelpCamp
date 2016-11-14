//ALL MIDDLEWARE
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.isUserCommentAuthor = function(req, res, next){
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(error, foundComment) {
            if(error){
                res.redirect("/campgrounds/" + req.params.id);
            }
            else
            {
                if(String(foundComment.author.id) === String(req.user._id)){
                    return next();
                }
                else
                {
                    req.flash("error", "You dont have permission to do that.");
                    res.redirect("/campgrounds/" + req.params.id);
                }
            }
        });
       
    }
    else {
        res.redirect("/login");
        req.session.returnTo = req.path;
    }
   
};

middlewareObj.isUserCampgroundAuthor= function (req, res, next){
    if(req.isAuthenticated()) {
        Campground.findById(req.params.id, function(error, foundCampground) {
            if(error){
                req.flash("error", "Campground not found");
                res.redirect("/campgrounds/");
            }
            else
            {
                if(String(foundCampground.author.id) === String(req.user._id)){
                    return next();
                }
                else
                {
                    req.flash("error", "You dont have permission to do that.");
                    res.redirect("/campgrounds/" + req.params.id);
                }
            }
        });
       
    }
    else {
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("/login");
        req.session.returnTo = req.path;
    }
   
};

middlewareObj.isLoggedIn= function (req, res, next){
    if(req.isAuthenticated()){
        return next();
        
    }
    req.session.returnTo = req.path; 
    req.flash("error", "Please sign in to do that.");
    res.redirect('/login');
    
};

module.exports = middlewareObj;