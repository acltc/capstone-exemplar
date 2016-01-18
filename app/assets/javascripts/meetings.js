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