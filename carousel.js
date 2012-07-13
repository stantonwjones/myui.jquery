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

var currentPosition; // Number representing currentPosition
var positions = []; // Array of values for left

/**
 * Performs transition to next state of the carousel
 * @return {null}
 */
function next() {
    currentPosition++;
    $carousel.css({left: positions[currentPosition] });
}

/**
 * Performs transition to previous state in carousel
 * @return {null}
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
            $carousel.css({left: positions[currentPosition] });
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
function removeCSSTransitions() {
    $carousel.find('.carousel-container').first().css({ transitionProperty: 'none' });
}
function addCSSTransitions() {
    $carousel.find('.carousel-container').first().css({ transitionProperty: 'left' });
}

