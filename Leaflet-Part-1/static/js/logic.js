// Storing the queryURL
const queryUrl = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

// Using d3 and a GET request grab the data
d3.json(queryUrl).then( data => Map_Features(data.features) );

// Define the Map_Features function
function Map_Features(earthquakeData) {

    // Define a function to run once for each feature.
    // Give each feature a popup with the key earthquake info.
    function EachFeature(feature, layer) {
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

    // Creating the circular markers with size depending on magnitude and color based on depth
    function createMarker(feature, latlng) {
        return L.circleMarker(latlng, {
            radius: feature.properties.mag * 5,
            color: 'black', fillColor: setMarkerColor(feature.geometry.coordinates[2]),
            weight: 0.25, opactiy: 0.5, fillOpacity: 0.8
        });
    };

    // Create a GeoJSON layer that contains the features array on the earthquakeData.
    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: EachFeature, pointToLayer: createMarker
    });

    // Send the layer to create_leaflet_map function
    create_leaflet_map(earthquakes);
};

    // Defining the create_leaflet_map function
function create_leaflet_map(earthquakes) {
    
    // Create the base layers
    let tile = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        subdomains: 'abcd',
        maxZoom: 20
    });

    // Create the map
    let map = L.map('map', {
        center: [ 37.09, -95.71 ],
        zoom: 5,
        layers: earthquakes
    });

    // Add the tile layer
    tile.addTo(map);

    // Create a legend to display information bout our map
    let info = L.control({ position: 'bottomright' });

    // When the layer legend is added, insert a div with the class of 'legend'
    info.addLegend = function() {
        let div = L.DomUtil.create('div', 'legend'),
            grades = [ 'depth-10', 'depth 10', 'depth 30', 'depth 50', 
            'depth 70', 'depth 90' ],
            legendInfo = '<h5>Earthquake\'s Depth</h5><hr>';
        
        div.innerHTML = legendInfo;
        
        grades.forEach((item, index) => {
            return div.innerHTML +=
                    '<i style="background: ' + setMarkerColor(item + 1) + ';"></i>&nbsp;' +
                    item + (grades[index + 1] ? '&nbsp;&ndash;&nbsp;' + grades[index + 1] + '<br>' : '+')
        });
        return div;
    };

    // Add the info legend
    info.addLegend(map);
};

// Function to set the marker colors based on the depth of the earthquake
function setMarkerColor(depth) {
    return depth > 90 ? '#E1C16E' :
            depth > 70 ? '#CD7F32' :
            depth > 50 ? '#A52A2A' :
            depth > 30 ? '#800020' :
            depth > 10 ? '#6E260E' :
                         '#954535' ;
};