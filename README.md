# 🌊 Global & Local Flood Risk Analysis

An interactive mapping project visualizing historical flood events and analyzing their impact on health infrastructure. This project was developed as part of a crash course to demonstrate the power of Open Data and Geospatial analysis.

## 🚀 Live Interactive Maps

Explore the data through these live Leaflet-powered maps:

*   **[🌍 Global Flood Archive](https://megphapha.github.io/crash-course-1/)** - Comprehensive view of 5,000+ major flood events worldwide since 1985.
*   **[🇬🇭 Ghana Risk Dashboard](https://megphapha.github.io/crash-course-1/ghana-floods/)** - Advanced analysis identifying health sites within 1km of flood zones in Ghana, featuring pulsing markers and layer filtering.
*   **[🇸🇳 Senegal Flood History](https://megphapha.github.io/crash-course-1/senegal-floods/)** - Focused historical view of major flood events in Senegal.

---

## 📊 Data Sources & Credits

This project relies on the following high-quality open data repositories:

1.  **[Global Archive of Large Flood Events (RIMES/DFO)](https://ckan.rdas.live/dataset/global-active-archive-of-large-flood-events)**  
    Maintained by the Dartmouth Flood Observatory (University of Colorado) and hosted by RIMES. It contains global flood records from 1985 to the present.
2.  **[OpenStreetMap (OSM) via Overpass API](https://www.openstreetmap.org/)**  
    Used to query and download coordinates for hospitals, clinics, and pharmacies in Ghana.
3.  **[Leaflet.js](https://leafletjs.com/)**  
    The leading open-source JavaScript library for mobile-friendly interactive maps.
4.  **[PapaParse](https://www.papaparse.com/)**  
    Used for efficient client-side CSV parsing.

---

## 🏗️ Project Structure

*   `/data/` - Raw datasets including the full global flood archive (CSV) and health site coordinates (JSON).
*   `/scripts/` - Python scripts for data filtering and spatial risk analysis (e.g., Haversine distance calculations).
*   `/ghana-floods/` - Localized map for Ghana with advanced risk highlighting.
*   `/senegal-floods/` - Localized map for Senegal.
*   `index.html` / `script.js` / `style.css` - The main global map located at the project root.

---

## 🧪 Analysis Methodology

For the **Ghana Risk Dashboard**, a custom Python script (`scripts/identify_at_risk.py`) was developed to:
1.  Load geographic coordinates for **2,145 health sites** (OSM).
2.  Load **24 historical flood event** locations in Ghana.
3.  Calculate the **Haversine distance** between every health site and every flood event.
4.  Identify sites within a **1km "Risk Buffer"** and export them for specialized map visualization.

---
*Created with ❤️ for the Turin Crash Course, 2026.*
