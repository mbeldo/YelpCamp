var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");


router.get("/campgrounds", function(req,res) {
    Campground.find({}, function(error, allcampgrounds){
    if(error){
        console.log(error);
    }    
    else{
        res.render("campgrounds/index", {campgrounds:allcampgrounds});
    }
    });
    
});



//ADD NEW CAMPGROUND FORM
router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res){
  
    res.render("campgrounds/new");
});

//SAVE CAMPGROUND
router.post("/campgrounds", middleware.isLoggedIn, function(req,res) {
   //get data from form and add to campground array
   var name = req.body.name;
   var image = req.body.image;
   var description = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   var newCampground = {name: name, image: image, description:description, author: author};
    Campground.create(newCampground, function(error, status){
        if(error){
            console.log(error);
            req.flash("error", error.message);
        }
        else{
            
        }
        //redirect back to the campgrounds page
        req.flash("success", newCampground.name + " was successfully added" );
        res.redirect("campgrounds");
    });
    
});


//SHOW CAMPGROUND
router.get("/campgrounds/:id",function(req, res){
    var id = req.params.id;
    Campground.findById(id).populate("comments").exec(function(error, foundCampground){
        if(error){
            //console.log(error);
            req.flash("error", "Sorry, that campground could not be found");
            res.redirect("/campgrounds");
            
        }
        else {
            //console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });

});

//EDIT CAMPGROUND ROUTE
router.get("/campgrounds/:id/edit", middleware.isUserCampgroundAuthor, function(req, res) {
    Campground.findById(req.params.id, function(error, foundCampground){
        if (error){
            console.log(error);
            res.redirect("/campgrounds/");
        }
        else{
                
             res.render("campgrounds/edit", {campground:foundCampground});
        }
    });
   
});


//UPDATE CAMPGROUND ROUTE
router.put("/campgrounds/:id/", middleware.isUserCampgroundAuthor, function(req,res){
    //Find and update campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(error, updatedCampground){
        if (error){
            console.log(error);
            res.redirect("/campgrounds/" + req.params.id);
        }
        else{
            req.flash("success", "Your edits to " + updatedCampground.name + " were saved");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DELETE CAMPGROUND
router.delete("/campgrounds/:id", middleware.isUserCampgroundAuthor, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(error){
        if(error){
            console.log(error);
            res.redirect("/campgrounds");
        }
        else {
            req.flash("success", "Campground deleted");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;