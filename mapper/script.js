/**
 * Drag-and-Drop Dataset Mapper Logic
 * Entirely client-side CSV processing and visualization.
 */

// 1. Initialize the Map
const map = L.map('map', {
    zoomControl: false
}).setView([20, 0], 2);

L.control.zoom({ position: 'topright' }).addTo(map);

// Add modern tiles
L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap contributors © CARTO',
    subdomains: 'abcd',
    maxZoom: 19
}).addTo(map);

// Layer group for data markers
let dataLayer = L.featureGroup().addTo(map);

// 2. UI Elements
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-upload');
const statusPanel = document.getElementById('status-panel');
const statusTitle = document.getElementById('status-title');
const statusInfo = document.getElementById('status-info');
const resetBtn = document.getElementById('reset-btn');

// 3. Drag & Drop Handlers
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => dropZone.classList.add('dragging'), false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragging'), false);
});

dropZone.addEventListener('drop', handleDrop, false);
fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]), false);

function handleDrop(e) {
    const dt = e.dataTransfer;
    const file = dt.files[0];
    handleFile(file);
}

// 4. File Processing Logic
function handleFile(file) {
    if (!file || !file.name.endsWith('.csv')) {
        alert("Please drop a valid CSV file.");
        return;
    }

    // Hide drop zone
    dropZone.classList.remove('active');

    Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: function(results) {
            visualizeData(results.data, file.name);
        },
        error: function(err) {
            console.error("Parsing error:", err);
            alert("Error parsing CSV. Check console for details.");
            dropZone.classList.add('active');
        }
    });
}

// 5. Visualization Logic
function visualizeData(data, filename) {
    // Clear existing markers
    dataLayer.clearLayers();

    // Identify coordinate columns
    const columns = Object.keys(data[0]);
    const latCol = columns.find(c => ['lat', 'latitude', 'anonymous_lat', 'y', 'latitud'].includes(c.toLowerCase().trim()));
    const lngCol = columns.find(c => ['long', 'lng', 'longitude', 'anonymous_long', 'x', 'longitud'].includes(c.toLowerCase().trim()));

    if (!latCol || !lngCol) {
        alert(`Could not find coordinate columns. \nDetected columns: ${columns.join(', ')}`);
        dropZone.classList.add('active');
        return;
    }

    let count = 0;
    data.forEach(row => {
        const lat = parseFloat(row[latCol]);
        const lng = parseFloat(row[lngCol]);

        if (!isNaN(lat) && !isNaN(lng)) {
            const marker = L.circleMarker([lat, lng], {
                radius: 6,
                fillColor: "#3498db",
                color: "#fff",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });

            // Create dynamic popup table
            let tableHtml = '<table class="popup-table">';
            for (const [key, value] of Object.entries(row)) {
                if (value !== null && value !== undefined) {
                    tableHtml += `<tr><td><b>${key}</b></td><td>${value}</td></tr>`;
                }
            }
            tableHtml += '</table>';

            marker.bindPopup(tableHtml, { maxWidth: 300 });
            marker.addTo(dataLayer);
            count++;
        }
    });

    if (count > 0) {
        // Zoom to fit data
        map.fitBounds(dataLayer.getBounds(), { padding: [50, 50] });
        
        // Show status panel
        statusTitle.innerText = filename;
        statusInfo.innerText = `Successfully mapped ${count} points.`;
        statusPanel.style.display = 'block';
    } else {
        alert("No valid coordinates found in the file.");
        dropZone.classList.add('active');
    }
}

// 6. Reset Logic
resetBtn.addEventListener('click', () => {
    dataLayer.clearLayers();
    statusPanel.style.display = 'none';
    dropZone.classList.add('active');
    fileInput.value = ''; // Clear input
    map.setView([20, 0], 2);
});
