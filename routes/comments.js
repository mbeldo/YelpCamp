var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//COMMENTS NEW
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, function(req, res) {
    
     Campground.findById(req.params.id, function(error, campground){
        if (error){
            console.log(error);
        }
        else
        {
                res.render("comments/new", {campground:campground});
        }
            });
});

//COMMENTS SAVE
router.post("/campgrounds/:id/comments", middleware.isLoggedIn, function(req, res){
    //look up campgrounds by id
    Campground.findById(req.params.id, function(error, campground) {
        if (error){
            console.log(error);
            res.redirect("/campgrounds");
        }
        else {
            Comment.create(req.body.comment, function(error, comment){
                if(error){
                    console.log(error);
                }
                else {
                    
                    //add username and ID to comment  and save
                    console.log("THis comment was made by" + req.user.username);
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    console.log(comment);
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Your comment has been added!");
                    res.redirect("/campgrounds/" + campground._id);
                }
                
            });
        }
    });

});

router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.isUserCommentAuthor,function(req,res) {
   
    Comment.findById(req.params.comment_id, function(error, foundComment) {
        if(error){
            res.redirect("/campgrounds");
        }
        else
        {
             console.log(foundComment);
               res.render("comments/edit", {campground_id:req.params.id, comment:foundComment});
        }
    });

});

//COMMENT UPDATE
router.put("/campgrounds/:id/comments/:comment_id", middleware.isUserCommentAuthor, function(req,res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(error, foundComment){
       if(error){
           res.redirect("back");
       }
       else
       {
           req.flash("success", "Your comment has been edited");
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});

router.delete("/campgrounds/:id/comments/:comment_id/delete", middleware.isUserCommentAuthor, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(error){
        if(error){
            res.redirect("back");
        }
        else
        {
            req.flash("success", "Your comment has been deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});




module.exports = router;