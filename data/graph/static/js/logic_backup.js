var pharmacyLayer  = new L.layerGroup();
var doctorlayer    = new L.LayerGroup();
var cliniclayer    = new L.LayerGroup();
var social_facility_Layer = new L.LayerGroup();


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
      "Healthsites": sites,
      "pharmacy"   : pharmacyLayer,
      "doctor"     : doctorlayer,
      "clinic"     : cliniclayer,
      "social_facility" : social_facility_Layer
    };

    console.log("Map and layers are set")


      // Create the map object with options
    var map = L.map("map", {
      center: [-27, 153],
      zoom: 4,
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

  var pharmacyMarkers = [];
  var doctorMarkers = [];
  var clinicMarkers = [];
  var socialMarkers = [];


  console.log(sites.length);

  for (var index = 0; index < sites.length; index++) {

      console.log(sites[index][0]);
    
      vLat = sites[index][0].lat;
      vLon = sites[index][0].lon;
      vAmenity = sites[index][0].loc_amenity;
      vName    = sites[index][0].loc_name;


      var siteMarker = L.circleMarker([vLon,vLat])
      .bindPopup("<h3>Name: " + vName + "</h3><h3>Amenity: "+vAmenity+"<h3>");
     
      siteMarkers.push(siteMarker);

      if (vAmenity === 'pharmacy'){

        var pharmacyMarker = L.circleMarker([vLon,vLat])
        .bindPopup("<h3>Name: " + vName + "</h3><h3>Amenity: "+vAmenity+"<h3>");

        pharmacyMarkers.push(pharmacyMarker);

      } 

      console.log(pharmacyMarkers)
    

  }  
 
  console.log(data);
  createMap(L.layerGroup(siteMarkers));
  

}).catch(error => {
   console.log("error fetching url :", error);
});