// hard code for backup due to CORS error occuring often
var beachJson = "/assets/js/discover/conditions.json";
var volcanoJson = "/assets/js/discover/volcanoData.json";

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

// Beach Markers layer group
var beachMarker = L.layerGroup();

d3.json(beachJson, function (beachData) {
  for (var i = 0; i < beachData.length; i++) {
    var beachMarkers = L.marker([beachData[i].lat, beachData[i].lon], {icon: umbrellaIcon}).bindPopup("<h4>" + beachData[i].beach + "</h4>" + "<hr>" +
      "<h6>Island: " + beachData[i].island + "</h6>" +
      "<h6>Shore: " + beachData[i].shore + "</h6>" +
      "<hr>" + "<h6>Temperature: " + beachData[i].temp + " F" + "</h6>" +
      "<h6>Weather: " + beachData[i].weather + "</h6>" +
      "<h6>Surf: " + beachData[i].surf + "</h6>" +
      "<a href=" + beachData[i].link + "><h6>Click here more info</h6></a>");
    beachMarker.addLayer(beachMarkers);
  }
});

// volcano Markers layer group
var volcanoMarker = L.layerGroup();

d3.json(volcanoJson, function (volcanoData) {
  for (var i = 0; i < volcanoData.length; i++) {
    var volcanoMarkers = L.marker([volcanoData[i].lat, volcanoData[i].lon], {icon: volcanoIcon}).bindPopup("<h4>Volcano Name: " + volcanoData[i].volcano_name + "</h4>" + "<hr>" +
    "<h6>Type: " + volcanoData[i].type + "</h6>" +
    "<h6>Status: " + volcanoData[i].status + "</h6>" +
    "<hr>" + "<h6>Last Known Eruption: " + volcanoData[i].last_known_eruption_type + " F" + "</h6>" +
    "<h6>Elevation: " + volcanoData[i].elevation_m + " meters</h6>");
    volcanoMarker.addLayer(volcanoMarkers);
  }
});

// Create a baseMaps object to hold the lightmap layer
var baseMaps = {
  "Street Map": outdoorMap,
  "Satellite Map": satelliteMap,
  "Light Map": lightMap
};

// Create an overlayMaps object to hold the beach conditions layer
var overlayMaps = {
  "<img src='/assets/img/beachUmbrella_icon.png' height=20> Beaches": beachMarker,
    "<img src='/assets/img/volcano_icon.png' height=20> Volcanoes": volcanoMarker
};

L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(map);