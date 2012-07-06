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
