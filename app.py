# app.py
from flask import Flask, render_template, request, jsonify
from dfa import simulate_dfa, generate_graph, dfa_configs
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

@app.route('/', methods=['GET'])
def index():
    logger.debug("Index route accessed")
    return render_template('index.html')

@app.route('/validateString', methods=['POST'])
def validate_string():
    logger.debug("Validate string endpoint accessed")
    logger.debug(f"Request form data: {request.form}")

    try:
        input_string = request.form.get('input_string', '')
        regex_type = request.form.get('regex', 'binary')  # Default to binary if not specified

        logger.debug(f"Received input_string: {input_string}")
        logger.debug(f"Received regex_type: {regex_type}")

        if not input_string:
            return jsonify({'error': 'No input string provided'}), 400

        # Check for invalid symbols
        config = dfa_configs[regex_type]
        invalid_symbols = set(input_string) - config['valid_symbols']
        if invalid_symbols:
            return jsonify({
                'error': f'Invalid character input: {", ".join(invalid_symbols)}. For {regex_type} language, only {", ".join(config["valid_symbols"])} are allowed.'
            }), 400

        # Simulate DFA and generate graph
        path, visited, accepted = simulate_dfa(input_string, regex_type)
        graph_svg, animation_data = generate_graph(path, visited, regex_type)

        response_data = {
            'result': 'Accepted' if accepted else 'Rejected',
            'graph_svg': graph_svg,
            'animation_data': animation_data
        }

        logger.debug(f"Sending response: {response_data}")
        return jsonify(response_data)

    except Exception as e:
        logger.error(f"Error in validate_string: {str(e)}")
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500

# Remove or comment out this block for production deployment
# if __name__ == '__main__':
#     logger.info("Starting Flask application...")
#     app.run(debug=True) #runs the flask application.