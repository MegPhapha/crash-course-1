// Initialize the map centered on Bordeaux
const map = L.map('map').setView([44.8378, -0.5792], 14);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Landmarks Data
const landmarks = [
    {
        name: "Place de la Bourse",
        coords: [44.8415, -0.5701],
        desc: "Home to the world's largest reflecting pool, the Miroir d'eau."
    },
    {
        name: "Cathédrale Saint-André",
        coords: [44.8377, -0.5775],
        desc: "A majestic Gothic cathedral where royal weddings once took place."
    },
    {
        name: "Grand Théâtre de Bordeaux",
        coords: [44.8427, -0.5744],
        desc: "An 18th-century architectural masterpiece and opera house."
    },
    {
        name: "Grosse Cloche",
        coords: [44.8357, -0.5714],
        desc: "A medieval gateway housing one of France's oldest bells."
    },
    {
        name: "La Cité du Vin",
        coords: [44.8624, -0.5501],
        desc: "A unique museum celebrating the global heritage of wine."
    }
];

// Add markers to the map
landmarks.forEach(landmark => {
    L.marker(landmark.coords)
        .addTo(map)
        .bindPopup(`<h3>${landmark.name}</h3><p>${landmark.desc}</p>`);
});
