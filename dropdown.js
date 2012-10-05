/**
 *  A basic jQuery extension for transforming a select box or json object into a dropdown list
 *
 *  TODO: should be able to take a select box as an input and spit out appropriately structured xml
 */
(function Dropdown( $ ) {

    // Placeholder Select item in place of actual jQuery object
    this.toDropdown( $selectOrJson ) {

        //$selectOrJson

    }

    /**
     *  Takes a $('select') element as an argument and returns a dropdown div structure
     */
    function transformSelect( $root ) {

        var $newDiv;

        if ( $root[o].nodeName.match(/^option$/i) {

            $newDiv = itemize( $root );

        }
        if ( $root[0].nodeName.match(/^(select|optgroup)$/i) {

            $newDiv = collect( $root );

        }

        return $newDiv;
    }

    /**
     *  Takes an object as an argument and returns a dropdown div structure
     *
     *  The group/item values of the object will determine the structure returned
     */
    function transformObject( root, name ) {
        var $newDiv = $('<div>');

        if ( root.item ) {
            return collect( root );
        } else if ( root.group ) {
            return itemize( root );
        }
    }

    /**
     *  Process the object as a group and return the transformed resulting html
     */
    function collect( root ) {

        if ( root[0] && root[0].nodeName ) {

        } else {

            
        }

    }

    /**
     *  Process the object as a singular dropdown item and return the resulting html
     */
    function itemize( root ) {

        // Check if we are processing a DOM node or generic object
        if ( root[0] && root[0].nodename ) {
        } else {
        }
    }
})(jQuery);
