from flask import Flask, render_template, request, jsonify
from dfa import simulate_dfa, generate_graph
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def validate_language_type(text):
    # Check if string contains only a and b
    if all(char in {'a', 'b'} for char in text):
        return 'alphabet'
    # Check if string contains only 0 and 1
    elif all(char in {'0', '1'} for char in text):
        return 'binary'
    return None

@app.route('/')
def home():
    return render_template('index.html') # Render the index.html template

@app.route('/validateString', methods=['POST'])
def validate_string():
    try:
        data = request.get_json()
        text = data.get('text', '')
        
        if not text:
            return jsonify({'error': 'No string provided'}), 400
            
        # Determine the language type
        language_type = validate_language_type(text)
        if not language_type:
            return jsonify({
                'error': 'Invalid string. String must contain only {a,b} or {0,1}',
                'valid': False
            }), 400
            
        # Simulate DFA
        path, visited, accepted = simulate_dfa(text, language_type)
        
        # Generate graph visualization
        graph_svg, animation_data = generate_graph(path, visited, language_type)
        
        return jsonify({
            'valid': accepted,
            'path': path,
            'visited': list(visited),
            'graph': graph_svg,
            'animation_data': animation_data
        })
        
    except Exception as e:
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500

if __name__ == '__main__':
    app.run(debug=True) #runs the flask application.