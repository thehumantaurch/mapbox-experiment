$(document).ready(function() {
  L.mapbox.accessToken = 'pk.eyJ1IjoidGhlaHVtYW50YXVyY2giLCJhIjoiLUJ5Nkd6NCJ9.dCa7lSVwCoV9n9mDoWgwhg';

  var map = L.mapbox.map('map', 'thehumantaurch.lg48lh4f');

  for (i = 0; i < gon.performances.length; i++) {
    marker = new L.marker([
      gon.performances[i].latitude,
      gon.performances[i].longitude])
    .bindPopup(gon.performances[i].latitude, gon.performances[i].longitude)
    .addTo(map);
  }

});

