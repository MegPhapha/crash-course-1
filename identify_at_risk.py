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

# 1. Load Ghana Flood Data
flood_df = pd.read_csv('ghana-floods/ghana_floods.csv')
flood_points = flood_df[['lat', 'long']].to_dict('records')

# 2. Load Health Sites Data
with open('health-data/ghana_health_sites_with_centers.json', 'r') as f:
    health_data = json.load(f)

at_risk_sites = []
processed_count = 0

print(f"Checking {len(health_data['elements'])} health sites against {len(flood_points)} flood events...")

# 3. Check distance for each health site
for site in health_data['elements']:
    # Get coordinates (node has lat/lon, way/relation has center)
    lat = site.get('lat') or (site.get('center') and site['center'].get('lat'))
    lon = site.get('lon') or (site.get('center') and site['center'].get('lon'))
    
    if not lat or not lon:
        continue
        
    is_at_risk = False
    for flood in flood_points:
        distance = haversine(lat, lon, flood['lat'], flood['long'])
        if distance <= 1.0: # Within 1km
            is_at_risk = True
            break
    
    if is_at_risk:
        at_risk_sites.append(site)
    
    processed_count += 1

# 4. Save the results
output = {
    "version": 0.6,
    "elements": at_risk_sites
}

with open('health-data/at_risk_health_sites.json', 'w') as f:
    json.dump(output, f, indent=2)

print(f"Done! Found {len(at_risk_sites)} health sites within 1km of a flood.")
