// 1. Initialize the Map
const map = L.map('map').setView([7.9465, -1.0232], 7);

// 2. Add Base Map Layers
const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 3. Define Icon Colors
const atRiskIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const healthSiteIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [20, 32],
  iconAnchor: [10, 32],
  popupAnchor: [1, -34],
  shadowSize: [32, 32]
});

// 4. Create Layer Groups
const floodLayer = L.layerGroup().addTo(map);
const atRiskLayer = L.layerGroup().addTo(map);
const allHealthSitesLayer = L.markerClusterGroup(); // Group for the 2,000 sites

// 5. Load Ghana Flood Data (Blue Markers)
Papa.parse('ghana_floods.csv', {
    download: true,
    header: true,
    complete: function(results) {
        results.data.forEach(row => {
            const lat = parseFloat(row.lat);
            const lng = parseFloat(row.long);
            if (!isNaN(lat) && !isNaN(lng)) {
                const marker = L.marker([lat, lng]);
                marker.bindPopup(`<h3>Flood Event</h3><p>${row.Began}</p>`);
                marker.addTo(floodLayer);
            }
        });
    }
});

// 6. Load At-Risk Health Sites Data (Red Markers)
fetch('at_risk_health_sites.json')
    .then(response => response.json())
    .then(data => {
        data.elements.forEach(site => {
            const lat = site.lat || (site.center && site.center.lat);
            const lng = site.lon || (site.center && site.center.lon);
            if (lat && lng) {
                const marker = L.marker([lat, lng], {icon: atRiskIcon});
                marker.bindPopup(`<h3>⚠️ AT-RISK SITE</h3><p>${site.tags.name || "Unnamed Site"}</p>`);
                marker.addTo(atRiskLayer);
            }
        });
    });

// 7. Load ALL Health Sites (Green Markers)
fetch('ghana_health_sites.json')
    .then(response => response.json())
    .then(data => {
        data.elements.forEach(site => {
            const lat = site.lat || (site.center && site.center.lat);
            const lng = site.lon || (site.center && site.center.lon);
            if (lat && lng) {
                const marker = L.marker([lat, lng], {icon: healthSiteIcon});
                marker.bindPopup(`<h3>Health Site</h3><p>${site.tags.name || "Unnamed Site"}</p>`);
                allHealthSitesLayer.addLayer(marker);
            }
        });
    });

// 8. Add Layer Controls (The Filter)
const overlayMaps = {
    "Flood Events": floodLayer,
    "At-Risk Sites (Red)": atRiskLayer,
    "All Health Sites (Green)": allHealthSitesLayer
};

L.control.layers(null, overlayMaps, { collapsed: false }).addTo(map);
