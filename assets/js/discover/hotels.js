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

function getColor(type) {
  return type == 'HOTEL' ? 'rgb(241, 9, 106)' :
    type == 'INDIVIDUAL VACATION UNIT' ? 'rgb(126, 45, 129)' :
      type == 'CONDOMINIUM HOTEL' ? 'rgb(21, 219, 143)' :
        type == 'BED & BREAKFAST' ? 'rgb(230, 54, 54)' :
          type == 'TIMESHARE' ? 'rgb(54, 230, 54)' :

            'white';
}

var hotelMarkers = L.geoJSON(null, {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 5,
      opacity: .5,
      //color: "#000",
      color: getColor(feature.properties.type),
      fillColor: getColor(feature.properties.type),
      fillOpacity: 0.8
    }).bindPopup("<h4>" + feature.properties.name + "</h4>" + "<hr>" +
      "<h6>type of Lodging: " + feature.properties.type + "</h6>" +
      "<h6 text-center>Islande: " + feature.properties.island + "</h6>" +
      "<h6>Year Opened: " + feature.properties.year_open + "</h6>" +
      "<h6>Address: " + feature.properties.address + "</h6>").on('click', function (e) {
        map.flyTo(e.latlng, 11);
      });
  },
  filter: function (feature, layer) {
    return (feature.properties.type == "HOTEL");
  }
}).addTo(map);

var individualUnitMarkers = L.geoJSON(null, {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 5,
      opacity: .5,
      //color: "#000",
      color: getColor(feature.properties.type),
      fillColor: getColor(feature.properties.type),
      fillOpacity: 0.8
    }).bindPopup("<h4>" + feature.properties.name + "</h4>" + "<hr>" +
      "<h6>type of Lodging: " + feature.properties.type + "</h6>" +
      "<h6 text-center>Islande: " + feature.properties.island + "</h6>" +
      "<h6>Year Opened: " + feature.properties.year_open + "</h6>" +
      "<h6>Address: " + feature.properties.address + "</h6>").on('click', function (e) {
        map.flyTo(e.latlng, 11);
      });
  },
  filter: function (feature, layer) {
    return (feature.properties.type == "INDIVIDUAL VACATION UNIT");
  }
});

var condoMarkers = L.geoJSON(null, {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 5,
      opacity: .5,
      //color: "#000",
      color: getColor(feature.properties.type),
      fillColor: getColor(feature.properties.type),
      fillOpacity: 0.8
    }).bindPopup("<h4>" + feature.properties.name + "</h4>" + "<hr>" +
      "<h6>type of Lodging: " + feature.properties.type + "</h6>" +
      "<h6 text-center>Islande: " + feature.properties.island + "</h6>" +
      "<h6>Year Opened: " + feature.properties.year_open + "</h6>" +
      "<h6>Address: " + feature.properties.address + "</h6>").on('click', function (e) {
        map.flyTo(e.latlng, 11);
      });
  },
  filter: function (feature, layer) {
    return (feature.properties.type == "CONDOMINIUM HOTEL");
  }
});

var bbMarkers = L.geoJSON(null, {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 5,
      opacity: .5,
      //color: "#000",
      color: getColor(feature.properties.type),
      fillColor: getColor(feature.properties.type),
      fillOpacity: 0.8
    }).bindPopup("<h4>" + feature.properties.name + "</h4>" + "<hr>" +
      "<h6>type of Lodging: " + feature.properties.type + "</h6>" +
      "<h6 text-center>Islande: " + feature.properties.island + "</h6>" +
      "<h6>Year Opened: " + feature.properties.year_open + "</h6>" +
      "<h6>Address: " + feature.properties.address + "</h6>").on('click', function (e) {
        map.flyTo(e.latlng, 11);
      });
  },
  filter: function (feature, layer) {
    return (feature.properties.type == "BED & BREAKFAST");
  }
});

var timeshareMarkers = L.geoJSON(null, {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 5,
      opacity: .5,
      //color: "#000",
      color: getColor(feature.properties.type),
      fillColor: getColor(feature.properties.type),
      fillOpacity: 0.8
    }).bindPopup("<h4>" + feature.properties.name + "</h4>" + "<hr>" +
      "<h6>type of Lodging: " + feature.properties.type + "</h6>" +
      "<h6 text-center>Islande: " + feature.properties.island + "</h6>" +
      "<h6>Year Opened: " + feature.properties.year_open + "</h6>" +
      "<h6>Address: " + feature.properties.address + "</h6>").on('click', function (e) {
        map.flyTo(e.latlng, 11);
      });
  },
  filter: function (feature, layer) {
    return (feature.properties.type == "TIMESHARE");
  }
});

var otherMarkers = L.geoJSON(null, {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 5,
      opacity: .5,
      //color: "#000",
      color: getColor(feature.properties.type),
      fillColor: getColor(feature.properties.type),
      fillOpacity: 0.8
    }).bindPopup("<h4>" + feature.properties.name + "</h4>" + "<hr>" +
      "<h6>type of Lodging: " + feature.properties.type + "</h6>" +
      "<h6 text-center>Islande: " + feature.properties.island + "</h6>" +
      "<h6>Year Opened: " + feature.properties.year_open + "</h6>" +
      "<h6>Address: " + feature.properties.address + "</h6>").on('click', function (e) {
        map.flyTo(e.latlng, 11);
      });
  },
  filter: function (feature, layer) {
    return (feature.properties.type == "OTHER");
  }
});

// Store our geoJson endpoint inside queryUrl
var hoteljson = "/assets/js/discover/hotelData.geojson";

d3.json(hoteljson, function (hotelData) {
  hotelMarkers.addData(hotelData);
  individualUnitMarkers.addData(hotelData);
  condoMarkers.addData(hotelData);
  bbMarkers.addData(hotelData);
  timeshareMarkers.addData(hotelData);
  otherMarkers.addData(hotelData);
});


// Create a baseMaps object to hold the lightmap layer
var baseMaps = {
  "Street Map": outdoorMap,
  "Satellite Map": satelliteMap,
  "Light Map": lightMap
};

// Create an overlayMaps object to hold the beach conditions layer
var overlayMaps = {
  "Hotels": hotelMarkers,
  "Individual Vacation Unit": individualUnitMarkers,
  "Condominium Hotel": condoMarkers,
  "Bed & Breakfast": bbMarkers,
  "Timeshare": timeshareMarkers,
  "Other": otherMarkers
};

// legend--------------------
var legend = L.control({
  position: 'topright'
});

legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend');
  labels = [];

  labels.push("<b>Type of Lodging</b><br>"); //Legend Title
  //items in Legend
  categories = ['HOTEL', 'INDIVIDUAL VACATION UNIT', 'CONDOMINIUM HOTEL', 'BED & BREAKFAST', 'TIMESHARE'];

  for (var i = 0; i < categories.length; i++) {
    div.innerHTML +=
      labels.push(
        '<i  style="background:' + getColor(categories[i]) + '">  </i> ' +
        (categories[i] ? categories[i] : '+'));
  }
  div.innerHTML = labels.join('<br>');
  return div;
};
// end of legend--------------------------

// Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
  collapsed: true,
  position: "bottomleft"
}).addTo(map);

legend.addTo(map);


// reset zoom button------------------------------
(function () {
  var control = new L.Control({ position: 'topleft' });
  control.onAdd = function (map) {
    var resetZoomButton = document.querySelector('.button-overlay');
    resetZoomButton.addEventListener('click', function () {
      map.setView([20.438043, -157.462667], 8);
    });
    return resetZoomButton;
  };
  return control;
}())
  .addTo(map);
// end of reset zoom button----------------------