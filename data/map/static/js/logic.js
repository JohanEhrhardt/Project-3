
// Initialize all of the LayerGroups we'll be using
var layers = {
  PHARMACY: new L.LayerGroup(),
  DOCTOR: new L.LayerGroup(),
  CLINIC: new L.LayerGroup(),
  DENTIST: new L.LayerGroup(),
  HOSPITAL: new L.LayerGroup()
}



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
      "pharmacy"   : layers.PHARMACY,
      "doctor"     : layers.DOCTOR,
      "clinic"     : layers.CLINIC,
      "dentist"    : layers.DENTIST,
      "hospital"   : layers.HOSPITAL

    };

    console.log("Map and layers are set")


      // Create the map object with options
    var map = L.map("map", {
      center: [-27, 153],
      zoom: 4,
      layers: [
        lightmap, 
        sites      
      ]
    });

    console.log("map definition is complete");


    // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);


}

/*
 *
 */

// Initialize an object containing icons for each layer group
var icons = {
  PHARMACY: L.ExtraMarkers.icon({
    //icon: "ion-settings",
    iconColor: "white",
    markerColor: "yellow",
    shape: "circle"
  }),
  DOCTOR: L.ExtraMarkers.icon({
    //icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "red",
    shape: "circle"
  }),
  CLINIC: L.ExtraMarkers.icon({
    //icon: "ion-minus-circled",
    iconColor: "white",
    markerColor: "blue-dark",
    shape: "circle"
  }),
  DENTIST: L.ExtraMarkers.icon({
    //icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "orange",
    shape: "circle"
  }),
  HOSPITAL: L.ExtraMarkers.icon({
    //icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "green",
    shape: "circle"
  })
};




/* 
 * 
 */


d3.json("http://127.0.0.1:5000/api/v0/healthsites").then(
 data => {

  var sites = data;
  var siteMarkers = [];


  console.log(sites.length);

  for (var index = 0; index < sites.length; index++) {

    
      vLat = sites[index][0].lat;
      vLon = sites[index][0].lon;
      vAmenity = sites[index][0].loc_amenity;
      vName    = sites[index][0].loc_name;


      var siteMarker = L.circleMarker([vLon,vLat])
      .bindPopup("<h3>Name: " + vName + "</h3><h3>Amenity: "+vAmenity+"<h3>");
     
      siteMarkers.push(siteMarker);


      if (vAmenity === 'pharmacy'){

        var pharmacyMarker = L.marker([vLon,vLat], {
          icon: icons['PHARMACY']
        });

        pharmacyMarker.addTo(layers['PHARMACY']);

        pharmacyMarker.bindPopup("<h3>Name: " + vName + "</h3><h3>Amenity: "+vAmenity+"<h3>");

      } 
      else if (vAmenity === 'doctors'){

        var doctorMarker = L.marker([vLon,vLat], {
          icon: icons['DOCTOR']
        });

        doctorMarker.addTo(layers['DOCTOR']);

        doctorMarker.bindPopup("<h3>Name: " + vName + "</h3><h3>Amenity: "+vAmenity+"<h3>");

      } 

      else if (vAmenity === 'clinic'){

        var clinicMarker = L.marker([vLon,vLat], {
          icon: icons['CLINIC']
        });

        clinicMarker.addTo(layers['CLINIC']);

        clinicMarker.bindPopup("<h3>Name: " + vName + "</h3><h3>Amenity: "+vAmenity+"<h3>");

      } 

      
      else if (vAmenity === 'dentist'){


        var dentistMarker = L.marker([vLon,vLat], {
          icon: icons['DENTIST']
        });

        dentistMarker.addTo(layers['DENTIST']);

        dentistMarker.bindPopup("<h3>Name: " + vName + "</h3><h3>Amenity: "+vAmenity+"<h3>");

      } 

            
      else if (vAmenity === 'hospital'){

        var hospitalMarker = L.marker([vLon,vLat], {
          icon: icons['HOSPITAL']
        });

        hospitalMarker.addTo(layers['HOSPITAL']);

        hospitalMarker.bindPopup("<h3>Name: " + vName + "</h3><h3>Amenity: "+vAmenity+"<h3>");

      } 


  
    

  }  
 

  createMap(L.layerGroup(siteMarkers));
  

}).catch(error => {
   console.log("error fetching url :", error);
});