from flask import Flask, render_template, request, jsonify
from dfa import simulate_dfa, generate_graph
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return render_template('index.html') # Render the index.html template

@app.route('/validateString', methods=['POST'])
def validate_string():
    try:
        data = request.get_json()
        text = data.get('text')
        #response = is_string_valid(text)
        return True #jsonify(response)
    except Exception as e:
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True) #runs the flask application.