/**
 * Carousel
 */
//---- Sandbox ----//
//TODO: extend jQuery

function Carousel( $carousel, options ) {
    var $carouselWindow;    // Dom object displaying only the desired carousel items.  Basically a wrapper
    var $carousel;          // Actual container of the list of items
    var $carouselItems;     // For carousel items
    var numItems;           // Stores the number of unique carousel items
    var currentPosition;    // Number representing currentPosition TODO: Replace Position w/ Index for symantics
    var viewWidth;          // width which allows us to see items
    var positions = [];     // Array of values for left
    var carouselObj = {};    // Object exposing carosel functionality.  TODO: Replace this with OOP JS

    // Set hash of default values
    var defaults = {
        animationDuration: 500, //replace these values throughout code
        transitionInterval: 0, // ditto ^
        childSelector: 'li',
        numShowing: 3,
        afterTransition: nullFunction,
        beforeTransition: nullFunction,
        nextButton: null,
        prevButton: null
    }

    var settings = $.extend({}, defaults, options);

    /**
     * Initiates carousel
     */
    function init() {
        $carouselItems = $carousel.children(settings.childSelector);
        calculatePositions();
        $carouselWindow = $carousel.wrap('div'); // TODO: add other styling indicators to this item
    }

    /**
     * Clones carousel items for extending carousel.  Call this once in the init function.
     */
    function extend() {
        $carouselItems.clone()
        .appendTo($carousel)
        .clone()
        .prependTo($carousel);
    }

    /**
     * Performs transition to next state of the carousel
     */
    function next() {
        currentPosition++;
        transition();
    }

    /**
     * Performs transition to previous state in carousel
     */
    function prev() {
        currentPosition--;
        transition();
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
            currentPostion += numItems;
            wraparound = true;
        } else if (currentPosition == positions.length - 2) {
            currentPosition -= numItems;
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
     * Null function TODO: why do I need this?
     */
    function nullFunction() {
        return null;
    }

    return {
        next: next,
        prev: prev
    };
}
