(function($) {
    $('form[data-givalidates]').submit( function() {
        $(this).find('input[type="text"]').each( function() {
            // Each validation must be put on the function
        });
    });
    function validateEmail($input) {
        var defaultValue = $input.data('defaultvalue');
        if ($input.val() == defaultValue) return false;

        if ($input.val().match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
        } else {
            return false;
        }
    }
    function validatePresence($input) {
        var defaultValue = $input.data('defaultvalue');
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
    }
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
