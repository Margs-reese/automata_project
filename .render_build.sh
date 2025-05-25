#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status.
set -o errexit

echo "--- Installing system package: graphviz ---"
apt-get update
apt-get install -y graphviz

echo "--- Installing Python dependencies ---"
pip install -r requirements.txt

echo "--- Build complete ---"