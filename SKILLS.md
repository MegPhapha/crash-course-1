# 🛠️ Master Project Skills Guide

This guide documents the custom automation capabilities (Skills) I've built for this project. Use this for quick reference or to recreate these features later.

---

## 🗺️ `csv-mapper-creator` (User Scope)

**Description**: 
A "Blueprint" skill that instantly creates and deploys a standalone, interactive map web app from any CSV file. It features a modern drag-and-drop interface and requires no server-side uploads.

### 👤 How to Use (For You)
When starting a new project or adding to this one, you can simply ask me:
*   *"Gemini, use my CSV Mapper skill to build a map in a folder called 'my-new-map'."*
*   *"Create a new mapping tool for this CSV file using our standard template."*

### 📋 What it Does (The "Recipe")
When this skill is triggered, I follow these exact technical steps:

#### 1. Project Initialization
I create a new folder (e.g., `mkdir -p my-new-map`). This folder name becomes the final URL of your map.

#### 2. Template Deployment
I copy the "Master Copy" of our design from my internal assets:
- **`index.html`**: The page structure.
- **`style.css`**: The modern glassmorphism (blurry background) design.
- **`script.js`**: The logic that reads CSVs and plots them on Leaflet.js.

#### 3. Automatic Detection
The script is programmed to automatically find columns named:
- **Latitude**: `lat`, `latitude`, `anonymous_lat`, `y`.
- **Longitude**: `long`, `lng`, `longitude`, `anonymous_long`, `x`.

#### 4. Automated Publishing
I follow a specific "GitHub Protocol" to ensure the new map doesn't overwrite your landing page:
1. `git add <new-folder>` (Stage only the new tool).
2. `git commit -m "feat: deploy new mapper"` (Document the change).
3. `git push origin main` (Make it live immediately).

**Live URL Pattern**: `https://<your-username>.github.io/crash-course-1/<new-folder>/`

---

### 💡 Core Design Principles
*   **Privacy-First**: No data is ever sent to a server. PapaParse reads the file entirely in your browser.
*   **User Feedback**: The app always tells the user how many points were mapped (e.g., "Mapped 523 points") or gives a clear error if coordinates are missing.
*   **Mobile Ready**: The map and menus are designed to look great on both desktop and phones.

---
*Created for the ICT4D 2026 Archive. Last Updated: April 23, 2026.*
