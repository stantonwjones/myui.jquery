/**
 * Carousel
 */
//---- Sandbox ----//
//TODO: extend jQuery

function Carousel( $carousel, options ) {
    var $carouselWindow;    // Dom object displaying only the desired carousel items.  Basically a wrapper
    var $carousel;          // Actual container of the list of items
    var $carouselItems;     // For carousel items
    var $originalCarouselItems;
    var numItems;           // Stores the number of unique carousel items
    var currentPosition = 0;    // Number representing currentPosition TODO: Replace Position w/ Index for symantics
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
    console.log(settings);
    init();

    /**
     * Initiates carousel
     */
    function init() {
        $originalCarouselItems = $carousel.children(settings.childSelector);
        extend();
        console.log($carouselItems);
        numItems = $originalCarouselItems.length;
        calculatePositions();
        $carouselWindow = $carousel.wrap('<div>').parent(); // TODO: add other styling indicators to this item
        console.log($carouselWindow, positions);
        var windowWidth = positions[3];
        $carouselWindow.width(windowWidth);
        initStyles();
        currentPosition += numItems;
        console.log(currentPosition);
        transition(); // initial transition to first position
        addCSSTransitions();
    }

    /**
     * Clones carousel items for extending carousel.  Call this once in the init function.
     */
    function extend() {
        $originalCarouselItems.clone()
        .appendTo($carousel)
        .clone()
        .prependTo($carousel);
        $carouselItems = $carousel.children(settings.childSelector);
    }

    /**
     * Sets the original css values
     */
    function initStyles() {
        var itemHeights = $originalCarouselItems.map(function() {
            return $(this).height();
        });
        var carouselCss = {
            position: 'relative',
            height: Math.max.apply(Math, itemHeights)
        }
        var carouselItemCss = {
            position: 'absolute'
        }
        var carouselWindowCss = {
            overflow: 'hidden'
        }

        $carousel.css(carouselCss);
        $carouselItems.css(carouselItemCss);
        $carouselWindow.css(carouselWindowCss);
    }

    /**
     * Performs transition to next state of the carousel
     */
    function next() {
        console.log('next method fired');
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
        $carousel.css({ left: ( positions[currentPosition] * -1 ) });
        // Replace the integer "1" and "2" below with a calculated value based on number of items shown in carousel
        // Wraparound logic
        var wraparound = false;
        console.log(currentPosition);
        if (currentPosition == 1) {
            currentPostion += numItems;
            wraparound = true;
        } else if (currentPosition == positions.length - 3) {
            currentPosition -= numItems;
            wraparound = true;
        }
        window.setTimeout(function() {
            if (wraparound) {
                performWithoutCSSTransition( function() {
                    console.log($carousel);
                    $carousel.css({
                        left: (positions[currentPosition] * -1)
                    });
                    console.log($carousel);
                });
            }
        }, settings.animationDuration);
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
    function performWithoutCSSTransition(func) {
        removeCSSTransitions();
        /*
        func();
        console.log($carousel);
        addCSSTransitions();
        */
    }
    function listenForTransitions() {
        $carousel.on('DOMAttrModified', function() {
            if (!cssTransitions) {
            console.log($carousel);
            func();
            addCSSTransitions();
            console.log($carousel);
        })
    }

    /**
     * Removes the css transition from the carousel
     */
    window.removeCSSTransitions = function() {
        $carousel.css({
            '-webkit-transition': 'none',
            '-moz-transition': 'none'
        });
    }

    /**
     * Adds css transitions to the carousel
     */
    function addCSSTransitions() {
        var seconds = settings.animationDuration / 1000 + 's';
        console.log(seconds);
        $carousel.css({
            mozTransitionProperty: 'left',
            webkitTransitionProperty: 'left',
            mozTransitionDuration: seconds,
            webkitTransitionDuration: seconds
        });
    }

    /**
     * Calculates values for the positions array based on width of elements in carousel.
     */
    function calculatePositions() {
        var value = 0;
        $carouselItems.each(function() {
            positions.push(value);
            $(this).css({ left: value });
            value += $(this).width();
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
