/**
 * Fading Carousel
 */
(function($) {
    var $fader;
    var $currentItem;
    var $nextItem;
    var $prevItem;
    var itemWidth;
    var itemHeight;
    var options;

    window.genuineFader = function($container, overrides) {
        var defaults = {
            selector: 'ul.fader',
            childSelector: 'li',
            transitionDelay: 0,
            animationDuration: 500,
            transitionInterval: 3000,
            beforeTransition: function(){},
            afterTransition: function(){},
            init: function(){}
            itemWidth: 0,
            itemHeight: 0
        }

        init();
    }

    function init() {
        options = $.extend({}, defaults, overrides);
        $fader = $container || $(options.selector).eq(0);
        $currentItem = $fader.children(options.childSelector).eq(0);
        if ( !$currentItem[0] ) return;
        $nextItem = $currentItem.next(options.childSelector);
        $prevItem = $currentItem.prev(options.childSelector);

        window.setInterval(transition, options.transitionInterval);
        setupStyle();
        options.init(null, $currentItem[0]);

    }
    function transition() {
        if ( !$currentItem[0] ) return;
        options.beforeTransition($prevItem[0], $currentItem[0], $nextItem[0]);
        window.setTimeout( performTransition, options.transitionDelay );
        window.setTimeout( function() {
            options.afterTransition($prevItem[0], $currentItem[0], $nextItem[0]);
        }, options.transitionDelay * 2 );
    }

    function performTransition() {
        $currentItem.css({zIndex: 51});
        $nextItem.css({zIndex: 50}).show();
        $currentItem.fadeOut(options.animationDuration);
        setItems();
    }

    function setItems() {
        if (!$currentItem) {
            $currentItem = $fader.children(options.childSelector).eq(0);
        } else if ($currentItem.next(options.childSelector)[0]) {
            $currentItem = $currentItem.next(options.childSelector);
        } else {
            $currentItem = $fader.children(options.childSelector).eq(0);
        }
        $nextItem = ($currentItem.next()[0]) ? $currentItem.next(options.childSelector) : $fader.children().eq(0);
        $prevItem = ($currentItem.prev()[0]) ? $currentItem.prev(options.childSelector) : $fader.children().eq($fader.children.length - 1);
    }

    function setupStyle() {
        $fader.children(options.childSelector).slice(1).hide();
        $fader.css({position: 'relative'});
        $fader.children(options.childSelector).css({position: 'absolute', top: '0px', left: '0px'});
    }
})(jQuery);
