# Backend Installations
**💾 fastapi & uvicorn installation**

Installation & virtual environment setup: 
```
cd backend
python -m venv .venv
.venv\Scripts\activate
.venv\Scripts\Activate.ps1
pip install fastapi
pip install uvicorn
```

If it doesn't work, exit the virtual env. Then enter the following commands in order at your terminal:
```
cd backend
pip install fastapi
pip install uvicorn
```

To verify if the required modules/packages  were installed:  

```
   pip list
```

# Setup & Usage
After installing the required modules at the backend side, run:

```
uvicorn main:app --reload
```
Then open the https link: http://127.0.0.1:8000 

<hr>

# Frontend Installations

# Viewing the website (temp)

**Temporarily use the Live Server plugin:** https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer 
> Go to the compiler.html file under src/components/pages/compiler.html

> Right-click the .html file and select Open with Live Server


