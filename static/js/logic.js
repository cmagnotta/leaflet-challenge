function createMap(earthquakes) {

var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

var baseMaps = {
    "Light Map": lightmap
  };

var overlayMaps = {
    "Earthquakes": earthquakes
  };

var map = L.map("map-id", {
    center: [38.5816, -121.4944],
    zoom: 12,
    layers: [lightmap, earthquakes]
  });

L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(map);
}


function createMarkers(response) {

    var earthquake = response.data.features;
  
    // Initialize an array to hold bike markers
    var quakeMarkers = [];
  
    // Loop through the stations array
    for (var index = 0; index < features.length; index++) {
      var earthquake = earthquake[index];
  
      // For each station, create a marker and bind a popup with the station's name
      var quakeMarkers = L.marker([features.lat, features.lon])
        .bindPopup("<h3>" + features.place + "<h3><h3>Magnitude: " + features.mag + "</h3>");
  
      // Add the marker to the bikeMarkers array
      quakeMarkers.push(quakeMarkers);
    }
  
    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(L.layerGroup(quakeMarkers));
  }
  

  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createMarkers);