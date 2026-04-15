// 1. Initialize the map centered on Ghana
const map = L.map('map').setView([7.9465, -1.0232], 7);

// 2. Add high-contrast tiles for better visualization
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 3. Define a custom red icon for At-Risk Health Sites
const atRiskIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// 4. Load Ghana's Flood Data (Blue Markers)
Papa.parse('ghana_floods.csv', {
    download: true,
    header: true,
    complete: function(results) {
        results.data.forEach(row => {
            const lat = parseFloat(row.lat);
            const lng = parseFloat(row.long);
            
            if (!isNaN(lat) && !isNaN(lng)) {
                const marker = L.marker([lat, lng]).addTo(map);
                const popupContent = `
                    <div style="font-family: 'Inter', sans-serif;">
                        <h3 style="margin: 0; color: #2980b9;">Ghana Flood</h3>
                        <p style="margin: 5px 0 0; font-size: 14px; color: #2c3e50;">
                            <b>Date:</b> ${row.Began} to ${row.Ended}<br>
                            <b>Cause:</b> ${row.MainCause}<br>
                            <b>Dead:</b> ${row.Dead} | <b>Displaced:</b> ${row.Displaced}
                        </p>
                    </div>
                `;
                marker.bindPopup(popupContent);
            }
        });
    }
});

// 5. Load At-Risk Health Sites Data (Red Markers)
fetch('at_risk_health_sites.json')
    .then(response => response.json())
    .then(data => {
        data.elements.forEach(site => {
            const lat = site.lat || (site.center && site.center.lat);
            const lng = site.lon || (site.center && site.center.lon);
            const name = site.tags.name || "Unnamed Health Site";
            const type = site.tags.amenity || "Medical Facility";

            if (lat && lng) {
                const marker = L.marker([lat, lng], {icon: atRiskIcon}).addTo(map);
                const popupContent = `
                    <div style="font-family: 'Inter', sans-serif;">
                        <h3 style="margin: 0; color: #c0392b;">⚠️ AT-RISK SITE</h3>
                        <p style="margin: 5px 0 0; font-size: 14px; color: #2c3e50;">
                            <b>Name:</b> ${name}<br>
                            <b>Type:</b> ${type}<br>
                            <span style="color: #e74c3c; font-weight: bold;">Within 1km of a historical flood!</span>
                        </p>
                    </div>
                `;
                marker.bindPopup(popupContent);
            }
        });
    });

// 6. Add a simple Legend
const legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
    const div = L.DomUtil.create('div', 'info legend');
    div.innerHTML = `
        <div style="background: white; padding: 10px; border-radius: 8px; border: 1px solid #ccc;">
            <p style="margin: 0 0 5px; font-weight: bold;">Legend</p>
            <div style="display: flex; align-items: center; margin-bottom: 5px;">
                <div style="width: 15px; height: 15px; background: #3498db; margin-right: 8px; border-radius: 50%;"></div>
                <span style="font-size: 12px;">Historical Flood</span>
            </div>
            <div style="display: flex; align-items: center;">
                <div style="width: 15px; height: 15px; background: #e74c3c; margin-right: 8px; border-radius: 50%;"></div>
                <span style="font-size: 12px;">At-Risk Health Site</span>
            </div>
        </div>
    `;
    return div;
};
legend.addTo(map);
