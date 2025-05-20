Flask Installation and Setup Guide
💾 Flask installation

Installation & virtual environment setup:

python -m venv .venv
.venv\Scripts\activate # For Windows
.venv\Scripts\Activate.ps1 # For Powershell on Windows
source .venv/bin/activate # For macOS and Linux
pip install -r requirements.txt

If it doesn't work, exit the virtual env. Then enter the following commands in order at your terminal:
pip install -r requirements.txt

To verify if the required modules/packages were installed:
pip list

Setup & Usage
After installing Flask, you have a couple of options to run your application:

Option 1: Using flask run (The standard way)

If your main application file is named app.py (or application.py), you can usually run it with:
flask run --debug

This assumes Flask can automatically discover your application.
Option 2: Using python -m flask (If you need to specify the app)

If your application is in a file named something other than the defaults, you can specify it like this:
python -m flask --app ./app.py run --debug

Then open the http link usually: http://127.0.0.1:5000
