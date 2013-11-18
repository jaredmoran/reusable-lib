// Toggles the hoverable class on the document

// @TODO - remove Modernizr and jQuery dependencies

var hoverable = function() {

    var scrolling = false,
        hoverClass = 'hoverable',
        prevScrollY = 0;

    var init = function() {
        if (!Modernizr.touch) {
            $(window).on('scroll', _onscroll);
        }
        $(document.documentElement).addClass(hoverClass);
    };

    var _onscroll = function() {
        thisplace.lastScrollY = prevScrollY;
        prevScrollY = window.pageYOffset;

        _requestScroll();
    };

    var _requestScroll = function() {
        if (!scrolling) {
            requestAnimationFrame(_update);
            scrolling = true;
            $(document.documentElement).removeClass(hoverClass);
        }
    };

    var _update = function() {
        scrolling = false;
        $(document.documentElement).addClass(hoverClass);
    };

    return {
        init: init
    };
};