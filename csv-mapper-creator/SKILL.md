---
name: csv-mapper-creator
description: Creates a browser-based interactive map from a CSV dataset with drag-and-drop support and automatic coordinate detection. Use this to quickly build and publish standalone mapping tools for any CSV data.
---

# CSV Mapper Creator

This skill enables the rapid creation of interactive, client-side web applications that visualize CSV data on a map.

## 🛠️ Components

- **Leaflet.js**: For interactive mapping.
- **PapaParse**: For local CSV parsing (ensuring data privacy).
- **Glassmorphism UI**: A modern, clean interface for file uploads.

## 📋 Workflow

### 1. Initialize the Project
Create a new directory for the specific web app. The folder name will determine the final URL path.

```bash
mkdir -p <project-name>
```

### 2. Deploy the Template
Copy the boilerplate assets from this skill to the new project directory.

- Assets location: `assets/template/`
- Files: `index.html`, `style.css`, `script.js`

### 3. Customize Functionality
Edit `<project-name>/script.js` to match the target dataset if the defaults are insufficient.

- **Coordinate Detection**: Update the `latCol` and `lngCol` search arrays if the CSV uses unusual column names.
- **Popup Content**: Modify the `visualizeData` function to change how row data is displayed in popups.
- **Map View**: Adjust `L.map('map').setView([lat, lng], zoom)` for a better initial focus.

### 4. Publishing to GitHub Pages
Follow this mandatory sequence to ensure the app is live at a separate URL on the `main` branch.

1. **Stage**: Add only the new directory.
   ```bash
   git add <project-name>
   ```
2. **Commit**:
   ```bash
   git commit -m "feat: deploy <project-name> csv mapper"
   ```
3. **Push**:
   ```bash
   git push origin main
   ```

**Final URL structure**: `https://<username>.github.io/<repository-name>/<project-name>/`

## 💡 Design Principles
- **Browser-Only**: Data must be processed locally. No server-side uploads.
- **Visual Impact**: Maintain the glassmorphism aesthetic for the drop zone and overlays.
- **User-Friendly**: Ensure the app provides clear status messages (e.g., "Mapped 100 points") and helpful errors when coordinates are missing.
