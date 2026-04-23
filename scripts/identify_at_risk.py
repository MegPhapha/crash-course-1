import pandas as pd
import json
import math

def haversine(lat1, lon1, lat2, lon2):
    """Calculate the distance between two points on Earth in km."""
    R = 6371  # Radius of the earth in km
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2) * math.sin(dlat / 2) + \
        math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * \
        math.sin(dlon / 2) * math.sin(dlon / 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

# --- Step 1: Load Ghana's historical flood locations from our CSV ---
flood_df = pd.read_csv('ghana-floods/ghana_floods.csv')
flood_points = flood_df[['lat', 'long']].to_dict('records')

# --- Step 2: Load the big list of health sites (hospitals, clinics, etc.) ---
with open('data/ghana_health_sites.json', 'r') as f:
    health_data = json.load(f)

at_risk_sites = []
processed_count = 0

print(f"Checking {len(health_data['elements'])} health sites against {len(flood_points)} flood events...")

# --- Step 3: Loop through every health site and check its distance ---
for site in health_data['elements']:
    # Each site has geographic coordinates (Latitude and Longitude)
    lat = site.get('lat') or (site.get('center') and site['center'].get('lat'))
    lon = site.get('lon') or (site.get('center') and site['center'].get('lon'))
    
    if not lat or not lon:
        continue
        
    is_at_risk = False
    # For this health site, check it against every single flood in our record
    for flood in flood_points:
        # The Haversine function calculates the real distance on the Earth's surface
        distance = haversine(lat, lon, flood['lat'], flood['long'])
        
        # If the distance is 1 kilometer or less, we consider it "At-Risk"
        if distance <= 1.0: 
            is_at_risk = True
            break
    
    if is_at_risk:
        at_risk_sites.append(site)
    
    processed_count += 1

# --- Step 4: Save the list of At-Risk sites to a new file for our map ---
output = {
    "version": 0.6,
    "elements": at_risk_sites
}

with open('ghana-floods/at_risk_health_sites.json', 'w') as f:
    json.dump(output, f, indent=2)

print(f"Done! Found {len(at_risk_sites)} health sites within 1km of a flood.")
