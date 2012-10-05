/**
 * Form validation library:
 *  $.validates => object level namespace
 *      ()          => shorthand for allForms TODO: implement this
 *      .allForms() => performs validations on all forms and their inputs TODO: implement this
 *      .newValidation() => programatically adds a custom validation to the lib PRIORITY!!! TODO: implement this
 *
 *  $.fn.validates => prototypal namespace
 *      () => sets up form validations for this collection
 *      .on() => TODO: backlogged item... maybe change event on which validations are performed (in addition to submit)
 *      .for() => pass the validation options to check. f/e 'presence email'.  should only work on an input/select/textarea
 *
 */
(function($) {
    // jQuery Bindings
    $.setValidations = validateAllForms;
    $.setValidations.allForms = validateAllForms;

    $.fn.setValidations = jQueryValidatesForm;
    //$.fn.setValidations.for = addValidationToInputField;

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

    /**
     * Abstraction of the validateForm method adopted for jQuery prototyping
     */
    function jQueryValidatesForm(options) {
        if (this.not(this.filter('form'))[0]) {
            console.error('Attempting to set validations on a non-form element');
            return;
        }
        var settings = $.extend({}, defaults, options);
        this.submit({settings: settings}, validateForm);
        return this;
    }

    /**
     * Sets validations on all forms using (TODO) options argument passed or existing html data-attributes
     *
     * @param options   hash defining callback methods for individual inputs and forms on success and error of validations
     */
    function validateAllForms(options) {
        var settings = $.extend({}, defaults, options);
        $('form').submit({settings: settings}, validateForm);
    }

    //  Abstract this out to a function on the jQuery object (maybe just a global function);
    //  TODO: an exposed version of this function which can be called on an individual form
    $('form[data-givalidates]').submit(validateForm);

    /**
     * Validates a single form.  Assumes that it is being called from within the scope of the form object.
     */
    function validateForm(e) {
        var validated = true;
        var $thisForm = $(this);

        // May want to expand this to textAreas and select dropdowns...
        $thisForm.find('input[data-validates]').each(function() {
            var $thisInput = $(this);
            var inputValidated = true;
            var validations = $thisInput.data('validates').split(' ');

            for (var i in validations) {
                try {
                    if (!validationFunctions[validations[i]]($thisInput)) {
                        e.data.settings.onInvalidated($thisInput);
                        inputValidated = validated = false;
                        console.log('error on: ', validations[i]);
                        break;
                    }
                } catch (e) {
                    console.error(e);
                    console.error("Invalid validation argument: ", validations[i]);
                }
            }
            if (inputValidated) e.data.settings.onValidated($thisInput);
        });

        // After iterating through each input, return the validated state, and perform any onError, or onSuccess functions
        if (validated) {
            console.log('success');
            return onSuccess($thisForm, e.data.settings.onSuccess);
        } else {
            console.log('error');
            return onError($thisForm, e.data.settings.onError);
        }
    }

    /**
     * Calls the onSuccess callback and returns true (allowing the form to submit).
     */
    function onSuccess($form, callback) {
        callback($form);
        return true;
    }

    /**
     * Calls the onError callback and returns false (preventing the form from submitting).
     */
    function onError($form, callback) {
        callback($form);
        return false;
    }

    /************
     *
     *  VALIDATIONS DEFINED HERE
     *
     */

    function validateEmail($input) {
        if (!$input.val()) return true;
        if ($input.val().match(/^[\w0-9._%+-]+@[\w0-9.-]+\.[A-Z]{2,4}$/i)) {
            return true;
        } else {
            $input.addClass('error');
            return false;
        }
    }
    function validatePresence($input) {
        if ($input.val() == $input.data('defaultvalue')) return false;
        if (!$input.val()) return false;
        return true;
    }
    function validateZip($input) {
        if (!$input.val()) return true;
        if ($input.val().match(/(^|[^\d])\d{5}[^\d]/)) return true;
        return false;
    }
    function validatePhoneNumber($input) {
        if (!$input.val()) return true;
        if ($input.val().match(/^1?[^\d]?\d{3}[^\d]?\d{3}[^\d]?\d{4}$/)) {
            return true;
        } else {
            return false;
        }
    }
})(jQuery);
