function createMap(earthquakes) {
  //console.log(earthquakes);
  
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
  
  var map = L.map("mapid").setView([38.5816, -121.4944], 3)
  
  lightmap.addTo(map);




  for (var i = 0; i < earthquakes.length; i++) {
    earthquakes[i].addTo(map);
  }
  
  //L.control.layers(baseMaps, overlayMaps).addTo(map);
  }
  
  
  function createMarkers(response) {
      //console.log(response);
      //var coordinates = response.features[0].geometry.coordinates;
      //var magnitude = response.features[0].properties.mag;
      //console.log(coordinates);
      console.log(magnitude);
      
      var quakeMarkers = [];
    
      
      for (var i = 0; i < response.features.length; i++) {
        const [lon, lat, depth] = response.features[i].geometry.coordinates;
        var magnitude = response.features[i].properties.mag;
  //console.log(lat)
        var quakeMarker = L.marker([lat, lon], {  });
        console.log(magnitude);
        var newwidth;
        var newheight;

       
          
        //console.log(coordinates);
        //
        

        if (magnitude > 8) {
          newwidth = 70;
          newheight = 80;
        }
        else if (magnitude > 5) {
          newwidth = 55;
          newheight = 65;
        }
        else if (magnitude > 3) {
          newwidth = 40;
          newheight = 50;
        }
        else {
          newwidth = 25;
          newheight = 35;
        }

        const iconAttr = {
          iconSize: [newwidth, newheight],
          shadowSize: [0, 0]
        };
        console.log(depth);

        if (depth > 50) {
          iconAttr.iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-black.png';
        }
        if (depth > 10) {
          iconAttr.iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png';
        } 
        else {
          iconAttr.iconUrl = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png'
        }
        var greenIcon = new L.Icon(iconAttr);
        var quakeMarker = L.marker([lat, lon], { icon:greenIcon })
          .bindPopup("<h3>" + response.features[i].properties.place + "<h3><h3>Magnitude: " + response.features[i].properties.mag + "</h3>");
        
        

        //quakeMarker._icon.className +=  " huechange";
        

       // icon.options.iconSize = [newwidth, newheight];
       // quakeMarker.setIcon(icon);

        quakeMarkers.push(quakeMarker);
      }
      

    

      createMap(quakeMarkers);
    }
    
    
    


    d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", createMarkers);