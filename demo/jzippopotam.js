;(function ( $, window, document, undefined ) {
  
  function emptyDataLists( options ) {
    options.placeDatalist.empty();
  }

  function addDataLists( options ) {
    options.placeDatalist = $('<datalist>', {id: 'jzippopotam-datalist-place'});
    options.place.after( options.placeDatalist ).attr('list', 'jzippopotam-datalist-place');
  }

  function updateDataLists( options ) {
    var country = options.country.val(),
        zip = options.zip.val();

    if ( country.length !== 2 || $.trim( zip ) === '') return;

    $.getJSON('http://api.zippopotam.us/'+country+'/'+zip, function( data ) {
      if ( data === {} ) return;

      emptyDataLists( options );
      for ( var i = 0, l = data.places.length; i < l; i++ ) {
        options.placeDatalist.append( $('<option>', {value: data.places[i]['place name']}) );
      }
    });
  }

  var methods = {
    init: function( options ) {
      addDataLists( options );
      updateDataLists( options );
      $.each([options.country, options.zip], function( index, field ) {
        field.on('change', function() {
          updateDataLists( options );
        });
      });
    }
  };

  $.jzippopotam = function( method ) {
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ) );
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' + method + ' does not exist on jQuery.jzippopotam');
    }
  };

})( jQuery, window, document );