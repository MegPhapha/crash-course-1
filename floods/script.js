// 1. Initialize the map centered on Ghana
// Latitude: 7.9465, Longitude: -1.0232 is roughly the center of Ghana
const map = L.map('map').setView([7.9465, -1.0232], 7);

// 2. Add OpenStreetMap tiles (the background map)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 3. Load the GeoJSON file we just created
fetch('GhanaFloods.geojson')
    .then(response => response.json())
    .then(data => {
        // 4. Add the GeoJSON data to the map
        L.geoJSON(data, {
            onEachFeature: function (feature, layer) {
                // 5. Add a popup with the city and date for each point
                if (feature.properties) {
                    const city = feature.properties.City;
                    const date = feature.properties.Date;
                    layer.bindPopup(`<h3>${city}</h3><p>Flood reported on: ${date}</p>`);
                }
            }
        }).addTo(map);
    })
    .catch(error => {
        console.error('Error loading the GeoJSON file:', error);
    });
