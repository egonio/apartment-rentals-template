$(document).ready(function () {

    var windowsize = $(window).width();

    $(window).resize(function () {
        windowsize = $(window).width();

    });




    var scroll_start = 0;
    var startchange = $('#startchange');
    var offset = startchange.offset();
    if (startchange.length) {
        $(document).scroll(function () {
            scroll_start = $(this).scrollTop();
            if (windowsize <= 767) {
                $(".navbar-dark").css('background-color', 'rgba(0, 115, 168,  1)');
                /*
                $("#nav").css('color', 'white');
                $("#navHome").css('color', 'white');
                $("#navAbout").css('color', 'white');
                $("#navContact").css('color', 'white');
                */
            } else if (scroll_start > offset.top) {
                $(".navbar-dark").css('background-color', 'rgba(0, 115, 168,  1)');
                // $("#nav").css('color', 'white').css('-webkit-text-stroke-width', '0px');
                // $("#navHome").css('color', 'white').css('-webkit-text-stroke-width', '0px');
                // $("#navAbout").css('color', 'white').css('-webkit-text-stroke-width', '0px');
                // $("#navContact").css('color', 'white').css('-webkit-text-stroke-width', '0px');
            } else {
                $('.navbar-dark').css('background-color', 'rgba(0, 115, 168, 0)');
                // $("#nav").css('color', '#0daef3').css('-webkit-text-stroke-width', '1.2px');
                // $("#navHome").css('color', '#0daef3').css('-webkit-text-stroke-width', '1.2px');
                // $("#navAbout").css('color', '#0daef3').css('-webkit-text-stroke-width', '1.2px');
                // $("#navContact").css('color', '#0daef3').css('-webkit-text-stroke-width', '1.2px');
            }
        });
    }

});