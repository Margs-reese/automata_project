import sys

path = '/home/automata/automata_project'
if path not in sys.path:
    sys.path.append(path)

from app import app as application 