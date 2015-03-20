$(document).ready(function() {
  L.mapbox.accessToken = 'pk.eyJ1IjoidGhlaHVtYW50YXVyY2giLCJhIjoiLUJ5Nkd6NCJ9.dCa7lSVwCoV9n9mDoWgwhg';

  var map = L.mapbox.map('map', 'thehumantaurch.lg48lh4f');

  var getSymbol = function(genre) {
    if (genre == "Comedy") {
      return "heart";
    } else if (genre == "Drama") {
      return "danger";
    } else if (genre == "Musical") {
      return "music";
    } else if (genre == "Children's Theater") {
      return "playground";
    } else return "theatre";
  };

  var getColor = function(price) {
    if (price <= 20) {
      return "#009933";
    } else if (price <= 40) {
      return "#FFCC00";
    } else return "#CC0000";
  };

  for (i = 0; i < gon.performances.length; i++) {
    if (new Date(gon.performances[i].start_date.toString()) > new Date()) {

    };
    var popupContent = "<p><a href='" + gon.performances[i].buy_tickets + "'>" + gon.performances[i].show_title + '</a></p></br>by<p> ' + gon.performances[i].theater_name + '</p>';
    marker = new L.marker([
      gon.performances[i].latitude,
      gon.performances[i].longitude], {
        icon: L.mapbox.marker.icon({
          'marker-size': 'medium',
          'marker-symbol': getSymbol(gon.performances[i].genre),
          'marker-color': getColor(gon.performances[i].price_low)
        })
      })
    .bindPopup(popupContent).openPopup()
    .addTo(map);
  }

});

