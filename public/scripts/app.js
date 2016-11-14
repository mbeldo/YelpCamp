$(document).ready(function() {
   window.setTimeout("fadeMyDiv();", 3000); //call fade in 3 seconds
   window.setTimeout("fadeMyDiv2();", 3000); //call fade in 3 seconds
   $("#test").mouseover(function(){
       $(this).addClass('active');
   });
 }
)

function fadeMyDiv() {
    $("#success").fadeOut('slow');
}
function fadeMyDiv2() {
   $("#error").fadeOut('slow');
}

