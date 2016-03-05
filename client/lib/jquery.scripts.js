(function ($) {
    function minHeight(){
        $('body').css({
            'min-height': window.innerHeight
        });
    }

    $(window).resize(function(event) {
        minHeight();
    });
    $(document).ready(function() {
        minHeight();
    });
})(jQuery);
