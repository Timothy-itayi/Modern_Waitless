import sys
import os

# Add the parent directory to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import the initialization script
from api._init_db import *

print("Database initialization script completed.") 