# 🌊 Global & Local Flood Risk Analysis

An interactive mapping project visualizing historical flood events and analyzing their impact on health infrastructure. This project was developed as part of a crash course to demonstrate the power of Open Data and Geospatial analysis.

## ✅ Summary of Your Project Suite

1. 🌍 Global Flood Archive (https://megphapha.github.io/crash-course-1/global-archive/): The comprehensive database of 5,000+ flood events.

2. 📊 Hazard Analytics (https://megphapha.github.io/crash-course-1/dashboard/): Interactive charts showing trends, causes, and impacts.

3. 🇬🇭 Ghana Risk Map (https://megphapha.github.io/crash-course-1/ghana-floods/): Spatial analysis of health sites in flood zones.

4. 🇸🇳 Senegal History (https://megphapha.github.io/crash-course-1/senegal-floods/): Targeted historical mapping for Senegal.

5. 🗺️ CSV Ingest Portal (https://megphapha.github.io/crash-course-1/mapper/): The universal drag-and-drop tool for any dataset.

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
5.  **[Chart.js](https://www.chartjs.org/)**  
    A flexible JavaScript charting library used to visualize global trends in our new dashboard.

---

## 🏗️ Project Structure

*   `/data/` - Raw datasets including the full global flood archive (CSV) and health site coordinates (JSON).
*   `/scripts/` - Python scripts for data filtering and spatial risk analysis (e.g., Haversine distance calculations).
*   `/dashboard/` - Interactive data dashboard with cards for top countries, year-over-year trends, and impact analysis using Chart.js.
*   `/mapper/` - Drag-and-drop tool to visualize any custom CSV dataset.
*   `/global-archive/` - The comprehensive world-view map of 5,000+ flood events.
*   `/ghana-floods/` - Localized map for Ghana with advanced risk highlighting.
*   `/senegal-floods/` - Localized map for Senegal.
*   `index.html` / `style.css` - The main project landing page (home).

---

## 📊 Dashboard Analysis Features

Our **Flood Data Dashboard** allows users to quickly understand the global impact of historical floods:
1.  **Top Countries by Event**: Identifying regions with high historical flood frequency.
2.  **Yearly Trends (1985-2021)**: Visualizing changes in flood events over time.
3.  **Cause Categorization**: Highlighting the primary drivers of flood events (e.g., Heavy Rain, Tropical Cyclones).
4.  **Severity Impact**: Comparing the scale of displacement across different severity levels.

## 🧪 Analysis Methodology

For the **Ghana Risk Dashboard**, a custom Python script (`scripts/identify_at_risk.py`) was developed to:
1.  Load geographic coordinates for **2,145 health sites** (OSM).
2.  Load **24 historical flood event** locations in Ghana.
3.  Calculate the **Haversine distance** between every health site and every flood event.
4.  Identify sites within a **1km "Risk Buffer"** and export them for specialized map visualization.

---
*Created with ❤️ for the Turin Crash Course, 2026.*
