(function($) {

    $.fn.listView = function( options ) {

        var template = options.template;
        var data = options.data;
        var filteredData = options.data;
        var callback = options.callback;

        var settings = {

            data: data,
            currentFilter: {},
            filteredData: data,
            refresh: '',
            filter: filterData

        };

        // For future pagination functionality
        //var pagesContainer = options.paginate;

        var container = this[0];
        if ( !container ) return;

        var $container = $( container );

        // Set data on the container
        $container.data( 'listView', settings );

        draw();
        if ( callback ) callback.call( container );

        // To maintain chainability
        return this;

        function draw() {

            var $list = $('<div />');
            // TODO: take pagination into account
            $.each( settings.filteredData, function( i, v ) {
                $list.append( $(template(this)) );
            });

            if ( $list[0] ) $container.html( $list.html() );

        }

        function filterData( filterParams ) {

            settings.filteredData = filter( settings.data, filterParams );
            draw();

        }
    };


    function filter( data, params ) {

        var filteredData = data.filter( function( item, index ) {
            for ( var key in params ) {
                if ( !params.hasOwnProperty(key) ) continue;
                if ( item[key].indexOf && item[key].indexOf(params[key]) >= 0 ) continue;
                if ( item[key] && item[key] == params[key] ) continue;
                return false;
            }
            return true;
        });
        return filteredData;
    }

})(jQuery);