var mongoose = require("mongoose");
var Campgorund = require("./models/campground");
var Comment = require("./models/comment");
var data = [
    {
    name: "Clouds Rest",
    image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed diam dolor. Donec odio nisi, dictum et ullamcorper eu, vulputate ac elit. In pellentesque congue neque, ut malesuada massa convallis in. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer non tempor massa. Duis egestas gravida varius. Nullam sem magna, volutpat at mi id, pellentesque mattis turpis. Aliquam non mollis augue, eget ultrices ante. Suspendisse hendrerit tristique vehicula."
    },
    {
    name: "Seedy Palance",
    image: "https://farm4.staticflickr.com/3270/2617191414_c5d8a25a94.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed diam dolor. Donec odio nisi, dictum et ullamcorper eu, vulputate ac elit. In pellentesque congue neque, ut malesuada massa convallis in. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer non tempor massa. Duis egestas gravida varius. Nullam sem magna, volutpat at mi id, pellentesque mattis turpis. Aliquam non mollis augue, eget ultrices ante. Suspendisse hendrerit tristique vehicula."
    },
    {
    name: "Penznance",
    image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed diam dolor. Donec odio nisi, dictum et ullamcorper eu, vulputate ac elit. In pellentesque congue neque, ut malesuada massa convallis in. Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer non tempor massa. Duis egestas gravida varius. Nullam sem magna, volutpat at mi id, pellentesque mattis turpis. Aliquam non mollis augue, eget ultrices ante. Suspendisse hendrerit tristique vehicula."
    }
];

function seedDB() {
    
Campgorund.remove({}, function(error) {
    //remove all campgorunds
    // if (error){
    //     console.log(error);
    // }
    // else
    // {
    // console.log("Everything deleted");
    //     data.forEach(function(seed){
    //     Campgorund.create(seed, function(error, campground){
            
    //         if(error)
    //         {
    //             console.log(error);
    //         }
    //         else
    //         {
    //             console.log("Campground added to the database");
    //             //create a comment
    //             Comment.create(
    //                 {
    //                     text: "This place is great, but I wish there was internet",
    //                     author: "homer"
    //                 }, function(error, comment){
    //                     if(error)
    //                     {
    //                         console.log(error);
    //                     }
    //                     else {
    //                         campground.comments.push(comment);
    //                         campground.save();
    //                         console.log("Comment added")
    //                     }

    //                 })
    //         }
    //     });
        
    // });
    // }
});

//add a few comments


}

module.exports = seedDB;