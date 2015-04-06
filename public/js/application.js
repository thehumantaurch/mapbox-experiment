document.addEventListener('DOMContentLoaded', function () {
  L.mapbox.accessToken = 'pk.eyJ1IjoidGhlaHVtYW50YXVyY2giLCJhIjoiLUJ5Nkd6NCJ9.dCa7lSVwCoV9n9mDoWgwhg';

  var map = L.mapbox.map('map', 'thehumantaurch.32edc5fc');

  var getSymbol = function(genre) {
    if (genre == "Comedy") {
      return "ice-cream";
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
      return "#0c3b3b";
    } else if (price <= 40) {
      return "#FFC266";
    } else return "#7A0000";
  };

  var showToday = function(performance, startDate, endDate) {
    today = new Date();
    start = new Date(startDate);
    end = new Date(endDate);
    day = today.toString().split(" ")[0];
    if (start < today && today < end) {
      if (performance.days.indexOf(day) != -1) {
        return true;
      } else return false;
    } else return false;
  };

  var showUpcoming = function(startDate) {
    today = new Date();
    start = new Date(startDate);

    if (start > today) {
      return true;
    } else return false;
  };

  var closingSoon = function(endDate) {
    today = new Date();
    end = new Date(endDate);
    dif = Math.floor((end - today)/(1000*3600*24));

    if (dif < 7) {
      return true;
    } else return false;
  };


  var geojson = [];

  var layer = L.mapbox.featureLayer();

  for (i = 0; i < gon.performances.length; i++) {
    var marker =
      {
        "type": "Feature",
        "geometry": {
          "coordinates": [
            gon.performances[i].latitude,
            gon.performances[i].longitude
          ],
          "type": "Point"
        },
        "properties": {
          "title": gon.performances[i].show_title,
          "address": gon.performances[i].address,
          "theater": gon.performances[i].theater_name,
          "url": gon.performances[i].buy_tickets,
          "tonight": showToday(gon.performances[i], gon.performances[i].start_date, gon.performances[i].end_date),
          "upcoming": showUpcoming(gon.performances[i].start_date),
          "closing-soon": closingSoon(gon.performances[i].end_date),
          "marker-color": getColor(gon.performances[i].price_low),
          "marker-size": "large",
          "marker-symbol": getSymbol(gon.performances[i].genre)
        }
      };
      geojson.push(marker);
    }

    layer.on('layeradd', function(e) {
      var marker = e.layer,
          feature = marker.feature;

      var popupContent = "<p><a href='" + feature.properties.url + "'>" + feature.properties.title + '</a></p>by<p> ' + feature.properties.theater + '</p><p>' + feature.properties.address + '</p>';

      marker.bindPopup(popupContent,{
          closeButton: false,
          minWidth: 320
      });
    });
  layer.setGeoJSON(geojson).addTo(map);
  map.fitBounds(layer.getBounds());

  map.legendControl.addLegend(document.getElementById('legend').innerHTML);


  closingSoon = document.getElementById('filter-closing-soon');
  upcoming = document.getElementById('filter-upcoming');
  tonight = document.getElementById('filter-tonight');
  all = document.getElementById('filter-all');

    closingSoon.onclick = function() {
        closingSoon.className = 'active';
        closingSoon.innerHTML = closingSoon.innerHTML + "!";
        upcoming.className = '';
        upcoming.innerHTML = "Upcoming";
        tonight.className = '';
        tonight.innerHTML = "Tonight";
        all.className = '';
        all.innerHTML = "All";
        layer.setFilter(function(f) {
            return f.properties['closing-soon'] === true;
        });
        return false;
    };

    upcoming.onclick = function() {
        closingSoon.className = '';
        closingSoon.innerHTML = "Closing Soon";
        upcoming.className = 'active';
        upcoming.innerHTML = upcoming.innerHTML + "!";
        tonight.className = '';
        tonight.innerHTML = "Tonight";
        all.className = '';
        all.innerHTML = "All";
        layer.setFilter(function(f) {
            return f.properties['upcoming'] === true;
        });
        return false;
    };

    tonight.onclick = function(e) {
        closingSoon.className = '';
        upcoming.className = '';
        upcoming.innerHTML = "Upcoming";
        tonight.className = 'active';
        tonight.innerHTML = tonight.innerHTML + "!";
        all.className = '';
        all.innerHTML = "All";
        layer.setFilter(function(f) {
            return f.properties['tonight'] === true;
        });
        return false;
    };

    all.onclick = function() {
        closingSoon.className = '';
        closingSoon.innerHTML = "Closing Soon";
        upcoming.className = '';
        upcoming.innerHTML = "Upcoming";
        tonight.className = '';
        tonight.innerHTML = "Tonight";
        all.className = 'active';
        all.innerHTML = all.innerHTML + "!";
        layer.setFilter(function(f) {
            return true;
        });
        return false;
    };

});
