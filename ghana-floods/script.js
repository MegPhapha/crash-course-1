// 1. Initialize the Map
const map = L.map('map', {
    zoomControl: false // Hide default zoom for cleaner look
}).setView([7.9465, -1.0232], 7);

// Add zoom control back in top-right
L.control.zoom({ position: 'topright' }).addTo(map);

// 2. Modern Tile Layer (CartoDB Voyager - very clean and nice)
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors © CARTO',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

// 3. Define Modern Visual Styles
const floodStyle = { color: '#3498db', fillColor: '#3498db', fillOpacity: 0.6, radius: 8, weight: 2 };
const healthSiteStyle = { color: '#27ae60', fillColor: '#2ecc71', fillOpacity: 0.8, radius: 5, weight: 1 };
const atRiskStyle = { color: '#c0392b', fillColor: '#e74c3c', fillOpacity: 0.9, radius: 10, weight: 3 };

// 4. Create Layer Groups
const floodLayer = L.layerGroup().addTo(map);
const atRiskLayer = L.layerGroup().addTo(map);
const allHealthSitesLayer = L.markerClusterGroup({
    showCoverageOnHover: false,
    spiderfyOnMaxZoom: true
});

// 5. Load Ghana Flood Data (Blue CircleMarkers)
Papa.parse('ghana_floods.csv', {
    download: true,
    header: true,
    complete: function(results) {
        results.data.forEach(row => {
            const lat = parseFloat(row.lat);
            const lng = parseFloat(row.long);
            if (!isNaN(lat) && !isNaN(lng)) {
                const marker = L.circleMarker([lat, lng], floodStyle);
                marker.bindPopup(`<div class="popup-title" style="color:#2980b9;">🌊 Flood Event</div>
                                 <p style="margin:0; font-size:13px; color:#64748b;">
                                 <b>Date:</b> ${row.Began}<br><b>Cause:</b> ${row.MainCause}</p>`);
                marker.addTo(floodLayer);
            }
        });
    }
});

// 6. Load At-Risk Health Sites Data (Pulsing Red Markers)
fetch('at_risk_health_sites.json')
    .then(response => response.json())
    .then(data => {
        data.elements.forEach(site => {
            const lat = site.lat || (site.center && site.center.lat);
            const lng = site.lon || (site.center && site.center.lon);
            if (lat && lng) {
                const marker = L.circleMarker([lat, lng], atRiskStyle);
                // Add CSS class for pulsing animation
                marker.on('add', function() {
                    const el = marker.getElement();
                    if (el) el.classList.add('pulse-marker');
                });
                marker.bindPopup(`<div class="popup-title" style="color:#c0392b;">⚠️ AT-RISK SITE</div>
                                 <p style="margin:0; font-size:13px; color:#64748b;">
                                 <b>Site:</b> ${site.tags.name || "Unnamed Facility"}<br>
                                 <b>Status:</b> Critical - Within 1km of Flood Zone</p>`);
                marker.addTo(atRiskLayer);
            }
        });
    });

// 7. Load ALL Health Sites (Green CircleMarkers)
fetch('ghana_health_sites.json')
    .then(response => response.json())
    .then(data => {
        data.elements.forEach(site => {
            const lat = site.lat || (site.center && site.center.lat);
            const lng = site.lon || (site.center && site.center.lon);
            if (lat && lng) {
                const marker = L.circleMarker([lat, lng], healthSiteStyle);
                marker.bindPopup(`<div class="popup-title" style="color:#27ae60;">🏥 Medical Facility</div>
                                 <p style="margin:0; font-size:13px; color:#64748b;">
                                 <b>Name:</b> ${site.tags.name || "Unnamed Facility"}<br>
                                 <b>Type:</b> ${site.tags.amenity}</p>`);
                allHealthSitesLayer.addLayer(marker);
            }
        });
    });

// 8. Enhanced Layer Controls (Filters)
const overlayMaps = {
    "<span style='color:#3498db; font-weight:600;'>Flood Events</span>": floodLayer,
    "<span style='color:#c0392b; font-weight:600;'>At-Risk Sites</span>": atRiskLayer,
    "<span style='color:#27ae60; font-weight:600;'>All Health Sites</span>": allHealthSitesLayer
};

L.control.layers(null, overlayMaps, { collapsed: false, position: 'bottomleft' }).addTo(map);

// 9. Modern Custom Legend
const legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info legend');
    div.innerHTML = `
        <div class="legend-item"><div class="legend-color" style="background: #3498db;"></div><span>Flood Zones</span></div>
        <div class="legend-item"><div class="legend-color" style="background: #e74c3c;"></div><span>At-Risk Facilities</span></div>
        <div class="legend-item"><div class="legend-color" style="background: #2ecc71;"></div><span>Health Infrastructure</span></div>
    `;
    return div;
};
legend.addTo(map);
