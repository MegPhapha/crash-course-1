// 1. Initialize the map centered globally
const map = L.map('map').setView([20, 0], 2);

// 2. Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 3. Load and parse the CSV data using PapaParse
Papa.parse('../data/rimes_flood_data.csv', {
    download: true,
    header: true,
    complete: function(results) {
        const data = results.data;
        
        // 4. Loop through each row in the CSV
        data.forEach(row => {
            const lat = parseFloat(row.lat);
            const lng = parseFloat(row.long);
            
            // Check if coordinates are valid
            if (!isNaN(lat) && !isNaN(lng)) {
                // 5. Create a marker for each flood event
                const marker = L.marker([lat, lng]).addTo(map);
                
                // 6. Add a popup with event details
                const popupContent = `
                    <div style="font-family: 'Inter', sans-serif;">
                        <h3 style="margin: 0; color: #2c3e50;">${row.Country}</h3>
                        <p style="margin: 5px 0 0; font-size: 14px; color: #7f8c8d;">
                            <b>Date:</b> ${row.Began} to ${row.Ended}<br>
                            <b>Cause:</b> ${row.MainCause}<br>
                            <b>Impact:</b> ${row.Dead} dead, ${row.Displaced} displaced
                        </p>
                    </div>
                `;
                marker.bindPopup(popupContent);
            }
        });
    },
    error: function(err) {
        console.error("Error loading CSV:", err);
    }
});
