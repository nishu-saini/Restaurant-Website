// carousel trainsitions and play-pause button..
$(document).ready(function() {
    $('#mycarousel').carousel( {interval: 2000} );
    
    $('#carouselButton').click(function() {
        if ( $('#carouselButton').children('span').hasClass('fa-pause') ){
            // pause carousel..
            $('#mycarousel').carousel('pause');

            // change pause button into play button...
            $('#carouselButton').children('span').removeClass('fa-pause');
            $('#carouselButton').children('span').addClass('fa-play');
        }

        else {
            // play carousel..
            $('#mycarousel').carousel('cycle');

            // change play button into pause button..
            $('#carouselButton').children('span').removeClass('fa-play');
            $('#carouselButton').children('span').addClass('fa-pause');

        }  
    });
});

// login button..
$('#loginButton').click(function() {
    $('#login-modal').modal('toggle');

    });

// Reserve Table button..
$('#reserveTable').click(function() {
    $('#reservation-modal').modal('toggle')

});




