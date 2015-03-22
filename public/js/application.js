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

  var compareDate = function(startDate, endDate) {
    today = new Date();
    start = new Date(startDate);
    end = new Date(endDate);

    if (start > today) {
      return 'upcoming';
    } else if (start < today < end) {
      return 'tonight';
    } else if (today > end) {
      return 'closed';
    }
  };

var geojson = [];

var layer = L.mapbox.featureLayer().addTo(map);

for (i = 0; i < gon.performances.length; i++) {
  var marker =
    {
      "type": "Feature",
      "geometry": {
        "coordinates": [
          gon.performances[i].longitude,
          gon.performances[i].latitude
        ],
        "type": "Point"
      },
      "properties": {
        "title": gon.performances[i].show_title,
        "address": gon.performances[i].address,
        "marker-color": getColor(gon.performances[i].price_low),
        "marker-size": "medium",
        "marker-symbol": getSymbol(gon.performances[i].genre)
      }
    }
    geojson.push(marker);
  };

  layer.setGeoJSON(geojson);
  layer.on('ready', function() {
    map.fitBounds(layer.getBounds());
  });
});
