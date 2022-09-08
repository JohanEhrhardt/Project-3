


function createMap(sites) {

  console.log("Create Map");

  // Define Variables for Tile Layers
  var satelliteMap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.satellite",
      accessToken: API_KEY
  });

  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });


  // Define baseMaps Object to Hold Base Layers
  var baseMaps = {
    "Light Map": lightmap,
    "Satellite": satelliteMap
  };


    // Create an overlayMaps object to hold the bikeStations layer
    var overlayMaps = {
      "Healthsites": sites
    };

    console.log("Map and layers are set")


      // Create the map object with options
    var map = L.map("map", {
      center: [153.73, -27.0059],
      zoom: 2,
      layers: [lightmap, sites]
    });

    console.log("map definition is complete");


    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);


}




d3.json("http://127.0.0.1:5000/api/v0/healthsites").then(
 data => {

  var sites = data;
  var siteMarkers = [];

  console.log(sites.length);

  for (var index = 0; index < sites.length; index++) {

      console.log(sites[index][0]);
    
      vLat = sites[index][0].lat;
      vLon = sites[index][0].lon;
      vAmenity = sites[index][0].loc_amenity;
      vName    = sites[index][0].loc_name;

      console.log(vLat);
      console.log(vLon);
      console.log(vAmenity);
      console.log(vName);


      var siteMarker = L.circleMarker([lat, lon])
      .bindPopup("<h3>Name: " + vName + "</h3><h3>Amenity: "+vAmenity+"<h3>");
     
      siteMarkers.push(siteMarker);

  }  
 
  console.log(data);
  createMap(L.layerGroup(siteMarkers));

}).catch(error => {
   console.log("error fetching url :", error);
});