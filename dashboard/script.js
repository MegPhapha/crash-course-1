// Dashboard logic for Flood Data

// 1. Fetch and Parse the CSV Data
// Using the "cleaned" version: ../data/flood_data.csv
Papa.parse('../data/flood_data.csv', {
    download: true,
    header: true,
    complete: function(results) {
        const data = results.data;
        console.log("Data loaded:", data.length, "rows");
        
        // Process data for charts
        processCharts(data);
    },
    error: function(err) {
        console.error("Error loading CSV:", err);
    }
});

function processCharts(data) {
    // Aggregators
    const countryCounts = {};
    const yearCounts = {};
    const causeCounts = {};
    const severityDisplaced = {};

    data.forEach(row => {
        // (1) Count events by country
        if (row.Country) {
            countryCounts[row.Country] = (countryCounts[row.Country] || 0) + 1;
        }

        // (2) Count events by year (Parsing the date column 'Began')
        if (row.Began) {
            // Dates are in format M/D/YY or M/D/YYYY
            const parts = row.Began.split('/');
            if (parts.length === 3) {
                let year = parts[2];
                // Normalize 2-digit years to 4-digit
                if (year.length === 2) {
                    year = parseInt(year) < 50 ? "20" + year : "19" + year;
                }
                yearCounts[year] = (yearCounts[year] || 0) + 1;
            }
        }

        // (3) Count events by cause
        if (row.MainCause) {
            const cause = row.MainCause.trim();
            causeCounts[cause] = (causeCounts[cause] || 0) + 1;
        }

        // (4) Sum displaced by severity
        if (row.Severity && row.Displaced) {
            const severity = row.Severity;
            const displaced = parseInt(row.Displaced) || 0;
            severityDisplaced[severity] = (severityDisplaced[severity] || 0) + displaced;
        }
    });

    // --- Prepare Chart 1: Top 20 Countries ---
    const topCountries = Object.entries(countryCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20);
    
    createBarChart('countryChart', 
        topCountries.map(x => x[0]), 
        topCountries.map(x => x[1]), 
        'Number of Flood Events', '#3498db');

    // --- Prepare Chart 2: Events per Year ---
    const years = Object.keys(yearCounts).sort();
    createLineChart('yearChart', 
        years, 
        years.map(y => yearCounts[y]), 
        'Events per Year', '#e67e22');

    // --- Prepare Chart 3: Top 10 Causes ---
    const topCauses = Object.entries(causeCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
    
    createBarChart('causeChart', 
        topCauses.map(x => x[0]), 
        topCauses.map(x => x[1]), 
        'Events by Main Cause', '#2ecc71', 'y'); // Horizontal

    // --- Prepare Chart 4: Displaced by Severity ---
    const severities = Object.keys(severityDisplaced).sort();
    createBarChart('severityChart', 
        severities.map(s => "Severity " + s), 
        severities.map(s => severityDisplaced[s]), 
        'Total Displaced People', '#e74c3c');
}

// Utility functions for creating charts
function createBarChart(canvasId, labels, data, label, color, axis = 'x') {
    new Chart(document.getElementById(canvasId), {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                backgroundColor: color,
                borderRadius: 5
            }]
        },
        options: {
            indexAxis: axis,
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

function createLineChart(canvasId, labels, data, label, color) {
    new Chart(document.getElementById(canvasId), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                borderColor: color,
                backgroundColor: color + '33', // Semi-transparent
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}
