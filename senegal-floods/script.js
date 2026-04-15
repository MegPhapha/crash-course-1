// 1. Initialize the map centered on Senegal
// Center of Senegal: [14.4974, -14.4524]
const map = L.map('map').setView([14.4974, -14.4524], 7);

// 2. Add high-contrast tiles for better visualization
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 3. Load Senegal's specific data
Papa.parse('senegal_floods.csv', {
    download: true,
    header: true,
    complete: function(results) {
        results.data.forEach(row => {
            const lat = parseFloat(row.lat);
            const lng = parseFloat(row.long);
            
            if (!isNaN(lat) && !isNaN(lng)) {
                // Use a marker for each location
                const marker = L.marker([lat, lng]).addTo(map);
                
                const popupContent = `
                    <div style="font-family: 'Inter', sans-serif;">
                        <h3 style="margin: 0; color: #d35400;">Senegal Flood</h3>
                        <p style="margin: 5px 0 0; font-size: 14px; color: #34495e;">
                            <b>Date:</b> ${row.Began} to ${row.Ended}<br>
                            <b>Main Cause:</b> ${row.MainCause}<br>
                            <b>Dead:</b> ${row.Dead} | <b>Displaced:</b> ${row.Displaced}
                        </p>
                    </div>
                `;
                marker.bindPopup(popupContent);
            }
        });
    }
});
