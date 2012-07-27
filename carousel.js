/**
 * Carousel
 */

(function($){
    $(document).ready(initCarousel);

    function initFader() {
        var ANIMATION_DURATION = 300;
        var TRANSITION_INTERVAL = 2000;

        var $fader = $('ul.fader').first();
        var $currentItem = $fader.children('li').first();

        window.setInterval(transition, TRANSITION_INTERVAL);

        function transition() {
            $currentItem.fadeOut(ANIMATION_DURATION);
            setCurrentItem();
            $currentItem.fadeIn(ANIMATION_DURATION);
        }

        function setCurrentItem() {
            if ($currentItem.next('li')[0]) {
                $currentItem = $currentItem.next('li');
            } else {
                $currentItem = $fader.children('li').first();
            }
        }
    }
})(jQuery);

//---- Sandbox ----//

function Carousel( $carousel, overrides ) {
    var $carouselWindow;    // Dom object displaying only the desired carousel items
    var $carousel;
    var currentPosition;    // Number representing currentPosition
    var positions = [];     // Array of values for left

    // Set hash of default values
    var defaults = {
        animationDuration: ANIMATION_DURATION, //replace these values throughout code
        transitionInterval: TRANSITION_INTERVAL, // ditto ^
        childSelector: 'li',
        numShowing: 3,
        afterTransition: nullFunction,
        beforeTransition: nullFunction,
        nextButton: null,
        prevButton: null
    }

    var settings = $.extend({}, defaults, overrides);

    /**
     * Initiates carousel
     */
    function init() {
        calculatePositions();
        $carouselWindow = $carousel.wrap('div');
    }

    /**
     * Performs transition to next state of the carousel
     */
    function next() {
        currentPosition++;
        $carousel.css({left: positions[currentPosition] });
    }

    /**
     * Performs transition to previous state in carousel
     */
    function prev() {
        currentPosition--;
        $carousel.css({ left: positions[currentPosition] });
    }

    /**
     * Transition business logic.  Includes wraparound logic
     */
    function transition() {
        $carousel.css({ left: positions[currentPosition] });
        // Replace the integer "1" and "2" below with a calculated value based on number of items shown in carousel
        // Wraparound logic
        var wraparound = false;
        if (currentPosition == 1) {
            currentPostion += positions.length;
            wraparound = true;
        } else if (currentPosition == positions.length - 2) {
            currentPosition -= positions.length;
            wraparound = true;
        }
        if (wraparound) {
            performWithoutTransition(function() {
                $carousel.css({ left: positions[currentPosition] });
            });
        }
    }

    /**
     * Performs pre-transition callbacks
     */
    function beforeTransition() {
    }

    /**
     * Performs post-transition callbacks
     */
    function afterTransition() {
    }

    /**
     * performs the function passed after removing the css transitions for the carousel.  Adds css transitions afterwards.
     * @param {function} func   The function to execute.
     * @return {null}
     */
    function performWithoutTransition(func) {
        removeCSSTransitions();
        func();
        addCSSTransitions();
    }

    /**
     * Removes the css transition from the carousel
     */
    function removeCSSTransitions() {
        $carousel.find('.carousel-container').first().css({ transitionProperty: 'none' });
    }

    /**
     * Adds css transitions to the carousel
     */
    function addCSSTransitions() {
        $carousel.find('.carousel-container').first().css({ transitionProperty: 'left' });
    }

    /**
     * Calculates values for the positions array based on width of elements in carousel.
     */
    function calculatePositions() {
        $carousel.find('.carousel-container .carousel-item').each(function(i, v) {
            var value = $(this).width();
            if (positions[i - 1]) {
                value += positions[i - 1];
            }
            positions.push(value);
        });
    }

    /**
     * Null function
     */
    function nullFunction() {
        return null;
    }
}
