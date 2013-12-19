define(['jquery', 'underscore', 'backbone','text!modules/map/mapViewTemplate.html'], 
function($, _, Backbone, mapViewTemplate){

  var MapView = Backbone.View.extend({

    //initialize template
    template:_.template(mapViewTemplate),
    
	activate: function(){
		//$( "#map" ).live( "pageinit", function() {
        var defaultLatLng = new google.maps.LatLng(34.0983425, -118.3267434);  // Default to Hollywood, CA when no geolocation support
	
	if ( navigator.geolocation ) {
		function success(pos) {
			// Location found, show map with these coordinates
			drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
		}
		
		function fail(error) {
			console.log(error);
			drawMap(defaultLatLng);  // Failed to find location, show default map
		}
		
		// Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
		navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
	} else {
		drawMap(defaultLatLng);  // No geolocation support, show default map	
	}

	function drawMap(latlng) {
		var myOptions = {
			zoom: 15,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		
		var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
		
		// Add an overlay to the map of current lat/lng
		var marker = new google.maps.Marker({
			position: latlng,
			map: map,
			title: "Greetings!"
		});
	}
	
	//});
	
    },
	
    //render the content into div of view 
    render: function(){
		this.$el.empty();
	  //this.el is the root element of Backbone.View. By default, it is a div.    
      //$el is cached jQuery object for the view's element.
      //append the compiled template into view div container
      this.$el.append(this.template());
	  this.$el.attr('id', 'map')
	  this.activate();
      //return to enable chained calls
      return this;
    }
  });
  return MapView;
});




