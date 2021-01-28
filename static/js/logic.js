function createMap(earthquakes) {
console.log(earthquakes);

var lightmap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: API_KEY
});

var baseMaps = {
    "Light Map": lightmap
  };

var overlayMaps = {
    "Earthquakes": earthquakes
  };

var map = L.map("mapid").setView([38.5816, -121.4944], 12)

lightmap.addTo(map);

for (var i = 0; i < earthquakes.length; i++) {
  earthquakes[i].addTo(map);
}

//L.control.layers(baseMaps, overlayMaps).addTo(map);
}


function createMarkers(response) {
    console.log(response);
    var coordinates = response.features[0].geometry.coordinates;
    var magnitude = response.features[0].properties.mag;
    console.log(coordinates);
    console.log(magnitude);
    
    var quakeMarkers = [];
  
    
    for (var i = 0; i < response.features.length; i++) {
      const [lon, lat] = response.features[i].geometry.coordinates;
console.log(lat)
      var quakeMarker = L.marker([lat, lon]);
        //.bindPopup("<h3>" + response.features[i].properties.place + "<h3><h3>Magnitude: " + response.features[i].properties.mag + "</h3>");
  
      // Add the marker to the bikeMarkers array
      quakeMarkers.push(quakeMarker);
    }
  
    // Create a layer group made from the bike markers array, pass it into the createMap function
    createMap(quakeMarkers);
  }
  

  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createMarkers);