from fastapi import FastAPI
from string_validator import validate_string

app = FastAPI()

@app.get('/')
def root():
    return {'message':'Server is running'}

@app.post('/validateString')
def validate_string(data:str):
    return validate_string(data)