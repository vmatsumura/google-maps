// Variaveis para configurar o mapa
var geocoder;
var map;
var marker;
var defaultLatitude = -23.5120818;
var defaultLongitude = -46.67278650000003;
var defaultZoom = 13;
var zoomAfterAddress = 17;

var JSLink = "https://maps.googleapis.com/maps/api/js?v=3.exp&key=";
var GoogleHashKey =  "";
JSLink += GoogleHashKey;

function initialize() {
	document.getElementById("latitude").setAttribute("value", defaultLatitude);
	document.getElementById("longitude").setAttribute("value", defaultLongitude);

	geocoder = new google.maps.Geocoder();
	var latlng = new google.maps.LatLng(defaultLatitude, defaultLongitude);
	var mapOptions = {
		zoom: defaultZoom,
		center: latlng
	}

	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	marker = new google.maps.Marker({
		position: latlng,
		map: map,
		title: 'Localização selecionada'
	});

	map.addListener('click', function (e) {
		getClickLocation('"' + e.latLng.lat() + "," + e.latLng.lng() + '"');
	});

	/*
				map.addListener('center_changed', function() {
					window.setTimeout(function() {
						map.panTo(marker.getPosition());
					}, 3000);
				});
	*/
}

function codeAddress() {
	var address = document.getElementById('address').value;
	geocoder.geocode({
		'address': address
	}, function (results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			marker.setPosition(results[0].geometry.location);
			map.setCenter(results[0].geometry.location);
			map.setZoom(zoomAfterAddress);
			document.getElementById("latitude").setAttribute("value", results[0].geometry.location.lat());
			document.getElementById("longitude").setAttribute("value", results[0].geometry.location.lng());
		} else {
			alert('Localização desconhecida: ' + status);
		}
	});
}

function getClickLocation(address) {
	geocoder.geocode({
		'address': address
	}, function (results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			marker.setPosition(results[0].geometry.location);
			document.getElementById("latitude").setAttribute("value", results[0].geometry.location.lat());
			document.getElementById("longitude").setAttribute("value", results[0].geometry.location.lng());
		} else {
			alert('Localização desconhecida: ' + status);
		}
	});
}

function isEnterKey(e) {
	if (e.keyCode == 13) {
		codeAddress();
	}
}

function loadScript(url, callback)
{
    // Adding the script tag to the head as suggested before
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url;

    // Then bind the event to the callback function.
    // There are several events for cross browser compatibility.
    script.onreadystatechange = callback;
    script.onload = callback;

    // Fire the loading
    head.appendChild(script);
}

var myPrettyCode = function() {
   google.maps.event.addDomListener(window, 'load', initialize);
};

loadScript(JSLink,myPrettyCode);