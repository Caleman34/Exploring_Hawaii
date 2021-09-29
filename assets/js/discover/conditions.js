function createMap(beachMarkers) {
  // console.log(beachMarkers, volcanoMarkers);

  // Create the tile layer that will be the background of our map
  var lightMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
  });

  var outdoorMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/outdoors-v11",
    accessToken: API_KEY
  });

  var satelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-streets-v11",
    accessToken: API_KEY
  });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Street Map": outdoorMap,
    "Satellite Map": satelliteMap,
    "Light Map": lightMap
  };

  // Create an overlayMaps object to hold the beach conditions layer
  var overlayMaps = {
    "<img src='/assets/img/beachUmbrella_icon.png' height=20> Beaches": beachMarkers
    // "Volcanoes": volcanoMarkers
  };

  // Create the map object with options
  var map = L.map("map", {
    center: [20.438043, -157.462667],
    zoom: 8,
    layers: [outdoorMap, beachMarkers]
  });

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}

var volcanoIcon = L.icon({
  iconUrl: '/assets/img/beachUmbrella_icon.png',
  iconSize: [20, 25]  
});

// Store our API endpoint inside queryUrl
// var queryUrl = "https://hawaiibeachsafety.com/rest/conditions.json";

// hard code for backup incase CORS error
var beachJson = "/assets/js/discover/conditions.json";
var volcanoJson = "/assets/js/discover/volcanoData.json";

// // Perform a GET request to the query URL
// d3.json(queryUrl, function (data) {
//   console.log(data);
// });

// get beach conditions data
d3.json(beachJson, function (beachData) {
  var beachMarkers = [];

  // Loop through the stations array
  for (var i = 0; i < beachData.length; i++) {

    // For each station, create a marker and bind a popup with the station's name
    var beachMarker = L.marker([beachData[i].lat, beachData[i].lon], {
      icon: volcanoIcon
    }).bindPopup("<h4>" + beachData[i].beach + "</h4>" + "<hr>" +
      "<h6>Island: " + beachData[i].island + "</h6>" +
      "<h6>Shore: " + beachData[i].shore + "</h6>" +
      "<hr>" + "<h6>Temperature: " + beachData[i].temp + " F" + "</h6>" +
      "<h6>Weather: " + beachData[i].weather + "</h6>" +
      "<h6>Surf: " + beachData[i].surf + "</h6>" +
      "<a href=" + beachData[i].link + "><h6>Click here more info</h6></a>");


    // Add the marker to the bikeMarkers array
    beachMarkers.push(beachMarker);
  }

  // Create a layer group made from the bike markers array, pass it into the createMap function
  createMap(L.featureGroup(beachMarkers));
});
  // // get volcano data
  // d3.json(volcanoJson, function (volcanoData) {
  //   var volcanoMarkers = [];

  //   // Loop through the stations array
  //   for (var i = 0; i < volcanoData.length; i++) {

  //     // For each station, create a marker and bind a popup with the station's name
  //     var volcanoMarker = L.circleMarker([volcanoData[i].lat, volcanoData[i].lon], {
  //       stroke: false,
  //       fillOpacity: 0.75,
  //       color: "white",
  //       fillColor: "black",
  //       radius: 5
  //     }).bindPopup("<h4>Volcano Name: " + volcanoData[i].volcano_name + "</h4>" + "<hr>" +
  //       "<h6>Type: " + volcanoData[i].type + "</h6>" +
  //       "<h6>Status: " + volcanoData[i].status + "</h6>" +
  //       "<hr>" + "<h6>Last Known Eruption: " + volcanoData[i].last_known_eruption_type + " F" + "</h6>" +
  //       "<h6>Elevation: " + volcanoData[i].elevation_m + " meters</h6>");


  //     // Add the marker to the bikeMarkers array
  //     volcanoMarkers.push(volcanoMarker);
  //   }

  //   // Create a layer group made from the bike markers array, pass it into the createMap function
  //   createMap(L.featureGroup(volcanoMarkers));
  // });