/**
 * Resizes image elements to fit the entire background of a site
 */
;(function($) { 
    var $container;
    var winHeight, winWidth, winRatio;
    var resizeSet = false;

    // Jack this format from srobbin's jquery-backstretch
    // However, want this to operate on any image tag as well
    $.backstretch = function( source, selector) {
        if (!resizeSet) {
            $(window).on('resize.backstretch', resizeImages);
        }
        var $img, imgHeight, imgWidth, imgRatio;

        // Find or append container div
        var containerCSS = {
            position: 'absolute', // use check to see if browser supports fixed
            display: none,
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            zIndex: -999999,
            padding: 0,
            margin: 0
        }
        if (!$($conainer).length) {
            $container = $('div').attr('id', 'backstretch').css(containerCSS).appendTo(document.body);
        }

        function resizeImages() {
            var $images = $container.find('img');
            $images.each( function() {
                resizeImage($img);
            } );
        }
        function resizeImage($img) {
            var css = {
                position: relative,
                left: 0,
                top: 0
            }

            if (winRatio > imgRatio) {
                // stretch image to fill vertically, cutting off sides
                $img.height( winHeight );
                $img.width( winHeight / imgRatio );
                css.left = ( winWidth - $img.width() ) / -2;
            } else {
                // stretch image to fill horizontally, cutting off top/bottom
                $img.width( winWidth );
                $img.height( winHeight * imgRatio );
                css.top = ( winHeight - $img.height() ) / -2;
            }
            $img.css( css );
        }
        function getWinRatio() {
            winHeight = $(window).height();
            winWidth = $(window).width();
            winRatio = winHeight / winWidth;
            return winRatio;
        }

        /**
         * Gets the ratio of the image.  Call this only once for the original ratio of the image
         */
        function getOriginalImgRatio() {
            imgRatio = $(this).height() / $(this).width();
            return winRatio;
        }
        function createImg(imgSource) {
            $img = $('img').attr('src', imgSource).css(width: 'auto', height: 'auto').load(getOriginalImgRatio);
        }
    }
})(jQuery);
           
