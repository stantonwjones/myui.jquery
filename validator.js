/**
 * Form validation library:
 *  $.validates => object level namespace
 *      ()          => shorthand for allForms TODO: implement this
 *      .allForms() => performs validations on all forms and their inputs TODO: implement this
 *
 *  $.fn.validates => prototypal namespace
 *      () => sets up form validations for this collection
 *      .on() => TODO: backlogged item... maybe change event on which validations are performed (in addition to submit)
 *      .for() => pass the validation options to check. f/e 'presence email'.  should only work on an input/select/textarea
 *
 */
(function($) {
    // Hash which maps validation stings to the functions which determine validation
    $.validations = {};
    $.fn.validates = function() {
    };

    var validationFunctions = {
        zip: validateZip,
        email: validateEmail,
        phone: validatePhoneNumber,
        presence: validatePresence
    }

    var defaults = {
        onValidated: function() {},     // called when an input passes validations and recieves that input as an argument
        onInvalidated: function() {},   // called when an input fails validation and recieves that input as an argument
        onSuccess: function() {},       // called when a form passes validation and recieves that form as an argument
        onError: function() {}          // called when a form fails validation and recieves that form as an argument
    }

    var settings = $.extend({}, defaults, options);

    //  Abstract this out to a function on the jQuery object (maybe just a global function);
    //  TODO: an exposed version of this function which can be called on an individual form
    $('form[data-givalidates]').submit(validateForm);

    /**
     * Validates a single form.  Assumes that it is being called from within the scope of the form object.
     */
    function validateForm() {
        var validated = true;
        var validations;

        // May want to expand this to textAreas and select dropdowns...
        $(this).find('input[data-validates]').each(function() {
            // $(this) now refers to the input objects in the form
            var inputValidated = true;
            validations = $(this).data('validates').split(' ');
            for (var i in validations) {
                try {
                    if (!validationFunctions[validations[i]]($(this))) {
                        settings.onInvalidated($(this));
                        inputValidated = validated = false;
                        break;
                    }
                } catch (e) {
                    console.error(e.description);
                    console.error("Invalid validation argument: ", validates[i]);
                }
            }
            if (inputValidated) settings.onValidated($(this));
        });

        // After iterating through each input, return the validated state, and perform any onError, or onSuccess functions
        if (validated) {
            return onSuccess();
        } else {
            return onError();
        }
    }

    /**
     * Calls the onSuccess callback and returns true (allowing the form to submit).
     */
    function onSuccess() {
        settings.onSuccess();
        return true;
    }

    /**
     * Calls the onError callback and returns false (preventing the form from submitting).
     */
    function onError() {
        settings.onError();
        return false;
    }

    /************
     *
     *  VALIDATIONS DEFINED HERE
     *
     */

    function validateEmail($input) {
        if ($input.val().match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
        } else {
            $input.addClass('error');
            return false;
        }
    }
    function validatePresence($input) {
        if ($input.val() == defaultValue) return false;
        if (!$input.val()) return false;
    }
    function validateZip($input) {
        if (!$input.val()) return true;
        if ($input.val().match(/(^|[^\d])\d{5}[^\d]/)) return true;
    }
    function validatePhoneNumber($input) {
        var defaultValue = $input.data('defaultvalue');
        if ($input.val() == defaultValue) return false;
        if ($input.val().match()) {
            return true;
        } else {
            return false;
        }
    }
})(jQuery);
