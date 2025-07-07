import os
from pathlib import Path
import re

def load_api_keys():
    """
    Load API keys from .apikeys file in project root.
    Returns a dictionary with key-value pairs from the file.
    """
    api_keys = {}
    # Get the project root directory
    project_root = Path(__file__).parent.parent.parent
    api_keys_file = project_root / '.apikeys'
    
    if api_keys_file.exists():
        with open(api_keys_file, 'r') as file:
            for line in file:
                line = line.strip()
                # Skip comments and empty lines
                if line.startswith('//') or not line:
                    continue
                
                # Extract key and value using regex to handle different formats
                match = re.match(r'^([A-Za-z_][A-Za-z0-9_]*)=[\'\"]?([^\'\"]*)[\'\"]?$', line)
                if match:
                    key, value = match.groups()
                    api_keys[key] = value
    
    return api_keys

# Load API keys at module import time
api_keys = load_api_keys()

# Export constants
OPENROUTER_API_KEY = api_keys.get('OPENROUTER_API_KEY', '')

