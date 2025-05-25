import sys

# Add your project directory to the Python path
path = '/home/yourusername/simulator'
if path not in sys.path:
    sys.path.append(path)

from app import app as application 