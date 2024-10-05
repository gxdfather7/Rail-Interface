import json
import math

# Load your JSON data from a file
with open('atrain.json', 'r') as file:
    data = json.load(file)

# Function to replace NaN values with a specified value (e.g., "null")
def replace_nan(obj):
    if isinstance(obj, list):
        for item in obj:
            replace_nan(item)
    elif isinstance(obj, dict):
        for key, value in list(obj.items()):
            if isinstance(value, float) and math.isnan(value):
                obj[key] = "null"
            else:
                replace_nan(value)

# Replace NaN values in the loaded JSON data
replace_nan(data)

# Save the modified JSON data back to a file
with open('modified_data.json', 'w') as file:
    json.dump(data, file, indent=4)
