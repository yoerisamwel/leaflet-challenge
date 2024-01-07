// Storing the queryURL and plate data
const queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'
const plateUrl = 'https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json'

// Performing a GET request to the query URL
d3.json(queryUrl).then( earthquakesData => 
    d3.json(plateUrl).then( plateData => 
        features(earthquakesData.features, plateData.features)
    )
);

// Define the Features_function to create the features
function features(earthquakeData, plateData) {

    // Define a AddToFeature function to run once for each feature 

    function onFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr>
                        <table>
                            <tr>
                                <td><b>Time</b></td>
                                <td>${new Date(feature.properties.time)}</td>
                            </tr>
                            <tr>
                                <td><b>Magnitude</b></td>
                                <td>${feature.properties.mag}</td>
                            </tr>
                            <tr>
                                <td><b>Depth</b></td>
                                <td>${feature.geometry.coordinates[2]}</td>
                            <tr>
                        </table>`);
    };

    // Define a function to create the circular markers
    function createMarker(feature, latlng) {
        return L.circleMarker(latlng, {
            radius: feature.properties.mag * 5,
            color: 'black',
            fillColor: setMarkerColor(feature.geometry.coordinates[2]),
            weight: 0.25,
            opactiy: 0.5,
            fillOpacity: 0.8
        });
    };

    // Create a GeoJSON layer
    let earthquakes = L.geoJSON(earthquakeData, {
        onFeature: onFeature,
        pointToLayer: createMarker
    });

    // Set up the GeoJSON layer
    let plates = L.geoJSON(plateData, {
        style: function() {
            return {
                color: 'green',
                weight: 2,
                opacity: 0.8
            }
        }
    });

    // Send the layer to createMap function
    createMap(earthquakes, plates);
};

// Define the createMap function
function createMap(earthquakes, plates) {
    
    // The base layers
    let light_all = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        maxZoom: 8
    });

    let cartoDarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        maxZoom: 8
    });

    let street = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 8,
        attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Create a baseMaps/tiles object.
    let baseMaps = {
        'Street Map': street,
        'light_all Map': light_all,
        'Carto Map': cartoDarkMatter
    };

    // Create overlay object to hold our overlay (earthquakes and tectonic)
    let overlayMaps = {
        'Tectonic Plates': plates,
        Earthquakes: earthquakes
    }

    // Create the map with the center coordinate being USA
    let map = L.map('map', {
        center: [ 37.09, -95.71 ],
        zoom: 5,
        layers: [ street, plates, earthquakes ]
    });

    // Create a legend
    let info = L.control({ position: 'bottomright' });

    // Insert a div with the 'legend' class
    info.onAdd = function() {
        let div = L.DomUtil.create('div', 'legend'),
            grades = [ -10, 10, 30, 50, 70, 90 ],
            legendInfo = '<h5>Earthquake\'s Depth</h5><hr>';
        
        div.innerHTML = legendInfo;
        
        grades.forEach((item, index) => {
            return div.innerHTML +=
                    '<i style="background: ' + setMarkerColor(item + 1) + ';"></i>' +
                    item + (grades[index + 1] ? '&nbsp;&ndash;&nbsp;' + grades[index + 1] + '<br>' : '+')
        });

        return div;
    };

    // Add the layer controls to the map
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: true
    }).addTo(map);

    // Add the info legend to the map
    info.addTo(map);
};

// Function to set the marker colors
function setMarkerColor(depth) {
    return depth > 90 ? '#E1C16E' :
            depth > 70 ? '#CD7F32' :
            depth > 50 ? '#A52A2A' :
            depth > 30 ? '#800020' :
            depth > 10 ? '#6E260E' :
                         '#954535' ;
};