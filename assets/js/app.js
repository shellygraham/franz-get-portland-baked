$(document).ready(function() {

	$(function(){
	    var windowH = $(window).height();
	    $('h1').css({'height':($(window).height())+'px'});         
	});

// This function will animate the button and then 
    //call it self on completing the animation
    function pulse() {
        // This will make sure the button only animates 
        // when the user is at the top of the page
        if ($(window).scrollTop() <= 50) {
            $('#scrollarrow').delay(200).fadeOut('slow').delay(50).fadeIn('slow', pulse);
        }
        else {
        }
    }
    // This will trigger the animation on when document is ready
    pulse();

    $(window).scroll(function(){              
        if ($(this).scrollTop() > 50) {
            // This will stop the animation
            $('#scrollarrow').clearQueue();
            // This will hide the bar
            $('#scrollarrow').fadeOut("slow");
        }else{
            // This will restart the animation when the user 
            // scrolls back to the top of the page
            pulse();
        } 
    });	
	
});
