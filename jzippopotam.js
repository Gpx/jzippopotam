;(function ( $, window, document, undefined ) {

  var defaultSettings = {
        countryValue: '',
        zipValue: ''
      },
      fields = ['country', 'zip'];

  function attachHandlersToFields( settings ) {
    $.each( fields, function( index, fieldName ) {
      if ( $.type( settings[fieldName] ) !== 'string' ) {
        settings[fieldName].on('change', function(){
          updateValues( settings );
          updateDatalists( settings );
        });
      }
    });
  }

  function attachDatalistToFields( settings ) {
    var field, datalist, datalistId;

    for ( var i = 0, l = settings.output.length; i < l; i++ ) {
      field = settings.output[i].field;
      datalistId = 'jzippopotam-datalist' + Math.random();
      datalist = $('<datalist>', {id: datalistId});

      settings.output[i].datalist = datalist;
      field.after( datalist ).attr('list', datalistId );
    }
  }

  function updateValues( settings, writeStrings ) {
    writeStrings = writeStrings || false;

    $.each( fields, function( index, fieldName ) {
      if ( $.type( settings[fieldName] ) !== 'string' ) {
        settings[fieldName + 'Value'] =
          settings[fieldName].data('jzippopotam-value') ||
          settings[fieldName].val();
      } else if ( writeStrings ) {
        settings[fieldName + 'Value'] = settings[fieldName];
      }
    });
  }

  function updateDatalists( settings ) {
    var country = settings.countryValue,
        zip = settings.zipValue,
        place, format;

    if ( $.trim( country ).length !== 2 ) return;
    if ( $.trim( zip ).length <= 0 ) return;

    for ( var i = 0, l = settings.output.length; i < l; i++ ) {
      datalist = settings.output[i].datalist;
      datalist.empty();
    }

    $.getJSON('http://api.zippopotam.us/'+country+'/'+zip)
      .success(function( data ) {
        for ( var i = 0, l = settings.output.length; i < l; i++ ) {
          datalist = settings.output[i].datalist;
          datalist.empty();
          
          for ( var j = 0, l2 = data.places.length; j < l2; j++ ) {
            place = data.places[j];
            format = settings.output[i].format;
            datalist.append( $('<option>', {
              value: renderDatalistValue( place, format )
            }) );
          }
        }
      });
  }

  function renderDatalistValue( place, format ) {
    return format.replace(/\{\{(\w|\s)+\}\}/gi, function( match ) {
      var parameterName = match.slice( 2, -2 );
      return place[parameterName];
    });
  }

  var methods = {
    init: function( options ) {

      var settings = $.extend( {}, defaultSettings, options );
      
      attachHandlersToFields( settings );
      attachDatalistToFields( settings );
      updateValues( settings, true );
      updateDatalists( settings );
    
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