/**
 * Fading Carousel
 */
(function($) {
    window.genuineFader = function(overrides) {
        var defaults = {
            selector: 'ul.fader',
            childSelector: 'li',
            animationDuration: 500,
            transitionInterval: 3000,
            beforeTransition: function(){},
            afterTransition: function(){}
        }

        init($.extend({}, defaults, overrides));
    }

    function init(options) {
        var $fader = $(options.selector).first();
        var $currentItem = $fader.children(options.childSelector).first();
        var $nextItem = $currentItem.next(options.childSelector);
        var $prevItem = $currentItem.prev(options.childSelector);

        window.setInterval(transition, options.transitionInterval);
        setupStyle();

        function transition() {
            options.beforeTransition($prevItem[0], $currentItem[0], $nextItem[0]);
            performTransition();
            options.afterTransition($prevItem[0], $currentItem[0], $nextItem[0]);
        }

        function performTransition() {
            $currentItem.css({zIndex: 51});
            $nextItem.css({zIndex: 50}).show();
            $currentItem.fadeOut(options.animationDuration);
            setItems();
        }

        function setItems() {
            if (!$currentItem) {
                $currentItem = $fader.children(options.childSelector).first();
            } else if ($currentItem.next(options.childSelector)[0]) {
                $currentItem = $currentItem.next(options.childSelector);
            } else {
                $currentItem = $fader.children(options.childSelector).first();
            }
            $nextItem = ($currentItem.next()[0]) ? $currentItem.next() : $fader.children().first();
            $prevItem = ($currentItem.prev()[0]) ? $currentItem.prev() : $fader.children().last();
        }

        function setupStyle() {
            $fader.children('li:not(:first-child)').hide();
            $fader.css({position: 'relative'});
            $fader.children('li').css({position: 'absolute', top: '0px', left: '0px'});
        }
    }
})(jQuery);
