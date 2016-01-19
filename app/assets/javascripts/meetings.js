/* global $, google */
function initializeMap() {
  var address = $("#meeting-address").text();
  var geocoder  = new google.maps.Geocoder();
  geocoder.geocode({'address': address}, function(results, status) {
    console.log(results, status);
    if (status === google.maps.GeocoderStatus.OK) {
      var mapProp = {
        center: results[0].geometry.location,
        zoom: 15,
        mapTypeId:google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
      new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    } else {
      console.log("Geocode was not successful for the following reason: " + status);
    }
  });
}

function initializeMapIndex(meetings) {
  console.log('initializeMapIndex', meetings);
  var mapProp = {
    center: new google.maps.LatLng(51.508742,-0.120850),
    zoom: 15,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
  var geocoder = new google.maps.Geocoder();
  var markers = [];
  var bounds = new google.maps.LatLngBounds();
  var infowindow = new google.maps.InfoWindow();
  meetings.forEach(function(meeting) {
    geocoder.geocode({address: meeting.address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
        var marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
        });
        marker.addListener('click', function() {
          infowindow.setContent(
            '<h2>' + meeting.title + '</h2>' +
            '<p>' + meeting.address + '</p>' +
            '<a href="/meetings/' + meeting.id + '">View more</a>'
          );
          infowindow.open(map, marker);
        });
        markers.push(marker);
        for (var i = 0;i < markers.length; i++) {
          bounds.extend(markers[i].getPosition());
        }
        map.fitBounds(bounds);
      }
    });
  });
}