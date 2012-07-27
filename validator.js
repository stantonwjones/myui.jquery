(function($) {
    $('form[data-givalidates]').submit( function() {
        $(this).find('input[data-validates]').each( function() {
            // Each validation must be put on the function
        });
    });
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
        var defaultValue = $input.data('defaultvalue');
        if ($input.val() == defaultValue) return false;
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
    function error($input) {
        $input.addClass('error');
    }
    // Description of process:
    // when form is submitted {
    //      loop through inputs (data-validates='email zip presence [some space delimited args]") {
    //          var validated = true;
    //          var validations = $(this).data('validates').split(' ');
    //          validations.each do |x| {
    //              if !validations[x]() {
    //                  $input.addClass('error');
    //                  validated = false;
    //                  break;
    //              }
    //          }
    //      }
    //      when finished erroring inputs, return validated to end form submission
    // }
    // all I have to do is define validation methods and prototype them to jQuery
    //
})(jQuery);


/* JS used for contact-us form validation on harvard vanguard
    // Calidates the Contact Us form if it exists on the page
    function validateContactForm() {
        $('#contactForm').submit(function() {
            return validatePresence($(this).find('#name')) && validateEmail($(this).find('#email')) && validateFormat($(this).find('#phone'));
        });

        function validatePresence($input) {
            if ($input.val()) {
                return true;
            } else {
                return false;
            }
        }
        function validateEmail($input) {
            if ($input.val().match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
                return true;
            } else {
                return false;
            }
        }
        function validateFormat($input) {
            if (!$input.val()) return true;
            if ($input.val().match(/^\d\.\d{3}\.\d{3}\.\d{4}$/) {
                return true;
            } else {
                return false;
            }
        }
    }
    */
