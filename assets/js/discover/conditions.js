// hard code for backup due to CORS error occuring often
var map = L.map("map", {
  center: [20.438043, -157.462667],
  zoom: 8
});

// Create the tile layer that will be the background of our map
var outdoorMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/outdoors-v11",
  accessToken: "pk.eyJ1IjoiY2FsZW1hbjM0IiwiYSI6ImNrcjQ0ZzNoZjA0eTIyb252cHZmcm1ldmMifQ.Fk39MiEHDwYwG-smYjNsSg"
});

outdoorMap.addTo(map);

var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/light-v10",
  accessToken: "pk.eyJ1IjoiY2FsZW1hbjM0IiwiYSI6ImNrcjQ0ZzNoZjA0eTIyb252cHZmcm1ldmMifQ.Fk39MiEHDwYwG-smYjNsSg"
});

var satelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/satellite-streets-v11",
  accessToken: "pk.eyJ1IjoiY2FsZW1hbjM0IiwiYSI6ImNrcjQ0ZzNoZjA0eTIyb252cHZmcm1ldmMifQ.Fk39MiEHDwYwG-smYjNsSg"
});

// Umbrella Icon
var umbrellaIcon = L.icon({
  iconUrl: '/assets/img/beachUmbrella_icon.png',
  iconSize: [20, 25]
});

// volcano Icon
var volcanoIcon = L.icon({
  iconUrl: '/assets/img/volcano_icon.png',
  iconSize: [20, 25]
});

var coralIcon = L.icon({
  iconUrl: '/assets/img/coral_icon.png',
  iconSize: [20, 25]
});

var beachJson = "/assets/js/discover/conditions.json";
var volcanoJson = "/assets/js/discover/volcanoData.json";
var coraljson = "/assets/js/discover/corals.json";
var parkjson = "/assets/js/discover/Parks.geojson";

// Beach Markers layer group
var beachMarker = L.layerGroup().addTo(map);

d3.json(beachJson, function (beachData) {
  for (var i = 0; i < beachData.length; i++) {
    var beachMarkers = L.marker([beachData[i].lat, beachData[i].lon], { icon: umbrellaIcon }).bindPopup("<h4>" + beachData[i].beach + "</h4>" + "<hr>" +
      "<h6>Island: " + beachData[i].island + "</h6>" +
      "<h6>Shore: " + beachData[i].shore + "</h6>" +
      "<hr>" + "<h6>Temperature: " + beachData[i].temp + " F" + "</h6>" +
      "<h6>Weather: " + beachData[i].weather + "</h6>" +
      "<h6>Surf: " + beachData[i].surf + "</h6>" +
      "<a href=" + beachData[i].link + "><h6>Click here more info</h6></a>").on('click', function(e) {
        map.flyTo(e.latlng, 11);
      });
    beachMarker.addLayer(beachMarkers);
  }
});

// volcano Markers layer group
var volcanoMarker = L.layerGroup();

d3.json(volcanoJson, function (volcanoData) {
  for (var i = 0; i < volcanoData.length; i++) {
    var lat = volcanoData[i].lat;
    var lon = volcanoData[i].lon;
    var volcanoMarkers = L.marker([lat,lon], { icon: volcanoIcon }).bindPopup("<h4>Volcano Name: " + volcanoData[i].volcano_name + "</h4>" + "<hr>" +
      "<h6>Type: " + volcanoData[i].type + "</h6>" +
      "<h6>Status: " + volcanoData[i].status + "</h6>" +
      "<hr>" + "<h6>Last Known Eruption: " + volcanoData[i].last_known_eruption_type + " F" + "</h6>" +
      "<h6>Elevation: " + volcanoData[i].elevation_m + " meters</h6>").on('click', function(e) {
        map.flyTo(e.latlng, 11);
      });
    volcanoMarker.addLayer(volcanoMarkers);
  }
});


// // coral marker layer group
var coralMarker = L.layerGroup().on({click: function(event) {
  map.panTo(event.target.getBounds());
}});

d3.json(coraljson, function (coralData) {
  for (var i = 0; i < coralData.length; i++) {
    var coralMarkers = L.marker([coralData[i].latitude, coralData[i].longitude], {icon: coralIcon }).bindPopup("<h4>Name: " + coralData[i].VernacularNameCategory + "</h4>" + "<hr>" +
    "<h6>Locality: " + coralData[i].Locality + "</h6>" +
    "<h6>Scientific Name: " + coralData[i].ScientificName + "</h6>" +
    "<h6>Depth: " + coralData[i].DepthInMeters + " meters</h6>").on('click', function(e) {
      map.flyTo(e.latlng, 11);
    });
    coralMarker.addLayer(coralMarkers);
  }
});

// park layer group

var parks = L.layerGroup().addTo(map);

d3.json(parkjson, function (parkData) {
  createFeatures(parkData.features);
});

function createFeatures(parkjson) {
  function onEachFeature(feature, parklayer) {

    parklayer.on({
      // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
      mouseover: function(event) {
        parklayer = event.target;
        parklayer.setStyle({
          fillOpacity: 0.9
        });
      },
      // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
      mouseout: function(event) {
        parklayer = event.target;
        parklayer.setStyle({
          fillOpacity: 0.5
        });
      },
      // When a feature (park) is clicked, it is enlarged to fit the screen
      click: function(event) {
        map.fitBounds(event.target.getBounds());
      }
    });

    parklayer.bindPopup("<h4>" + feature.properties.name +"</h4>" + "<hr>" + "<h6>Type of Park: "
      + feature.properties.type + "</h6>");
  }

  function style(feature, layer) {
    return {
      opacity: 0.5,
      radius: 5,
      weight: 1,
      color: "green",
      fillColor: "green",
      fillOpacity: 0.5
    }
  }

  var park = L.geoJSON(parkjson, {
    pointToLayer: function(_geometry, coordinates) {
      return L.circleMarker(coordinates);
  },
  onEachFeature: onEachFeature,
  style: style
});
parks.addLayer(park);
  };


// Create a baseMaps object to hold the lightmap layer
var baseMaps = {
  "Street Map": outdoorMap,
  "Satellite Map": satelliteMap,
  "Light Map": lightMap
};

// Create an overlayMaps object to hold the beach conditions layer
var overlayMaps = {
  "<img src='/assets/img/beachUmbrella_icon.png' height=20> Beaches": beachMarker,
  "<img src='/assets/img/park_icon.png' height=20> Parks": parks,
  "<img src='/assets/img/volcano_icon.png' height=20> Volcanoes": volcanoMarker,
  "<img src='/assets/img/coral_icon.png' height=20> Coral Sites": coralMarker
};
L.control.scale().addTo(map);

(function() {
	var control = new L.Control({position:'topleft'});
	control.onAdd = function(map) {
    var resetZoomButton = document.querySelector('.button-overlay');
    resetZoomButton.addEventListener('click', function() {
      map.setView([20.438043, -157.462667], 8);
    });
			return resetZoomButton;
		};
	return control;
}())
.addTo(map);

L.control.layers(baseMaps, overlayMaps, {
  collapsed: true,
  position: "bottomleft"
}).addTo(map);

