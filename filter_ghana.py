import pandas as pd

# 1. Load the big flood data file
print("Loading the data...")
df = pd.read_csv('rimes_flood_data.csv')

# 2. Look for rows where the Country is 'Ghana'
# We use .str.strip() just in case there are hidden spaces
print("Filtering for Ghana...")
ghana_data = df[df['Country'].str.strip() == 'Ghana']

# 3. Save this new list to a separate file
ghana_data.to_csv('ghana_floods.csv', index=False)

print(f"Success! Created 'ghana_floods.csv' with {len(ghana_data)} events.")
print(ghana_data.head()) # Show the first few rows of the new file
