# 01-dfa.py

import graphviz

# Use the exact node and transition data provided in the first prompt
# Assuming this is the intended complete definition, as the last one was truncated
binary_nodes ={
    'q0': {'1': 'q0', '0': 'q1'},
    'q1': {'1': 'q1', '0': 'q2'},
    'q2': {'1': 'q3', '0': 'q4'},
    'q3': {'1': 'q5', '0': 'q4'},
    'q4': {'1': None, '0': 'q7'},
    'q5': {'1': 'q14', '0': 'q6'},
    'q6': {'1': 'q8', '0': 'q9'},
    'q7': {'1': 'q12', '0': 'q10'},
    'q8': {'1': 'q12', '0': 'q10'},
    'q9': {'1': 'q12', '0': 'q17'},
    'q10': {'1': 'q8', '0': 'q11'},
    'q11': {'1': None, '0': 'q17'},
    'q12': {'1': 'q13', '0': 'q9'},
    'q13': {'1': 'q17', '0': None},
    'q14': {'1': 'q15', '0': 'q16'},
    'q15': {'1': 'q17', '0': 'q16'},
    'q16': {'1': 'q15', '0': 'q17'},
    'q17': {'1': 'q18', '0': 'q18'},
    'q18': {'1': 'q19', '0': 'q18'},
    'q19': {'1': 'q20', '0': 'q19'},
    'q20': {'1': 'q21', '0': 'q20'},
    'q21': {'1': 'q21', '0': 'q22'},
    'q22': {'1': None, '0': 'q21'},
    }

alpha_nodes ={
    'q0': {'a': 'q1', 'b': 'q2'},
    'q1': {'a': 'q3', 'b': None}, # Transition to None (trap)
    'q2': {'a': None, 'b': 'q3'}, # Transition to None (trap)
    'q3': {'a': 'q4', 'b': 'q5'},
    'q4': {'a': None, 'b': 'q6'}, # Transition to None (trap)
    'q5': {'a': 'q7', 'b': 'q7'},
    'q6': {'a': 'q8', 'b': None}, # Transition to None (trap)
    'q7': {'a': None, 'b': 'q8'}, # Transition to None (trap)
    'q8': {'a': 'q9', 'b': 'q10'},
    'q9': {'a': 'q11', 'b': 'q10'},
    'q10': {'a': 'q9', 'b': 'q11'},
    'q11': {'a': 'q12', 'b': 'q10'},
    'q12': {'a': 'q13', 'b': 'q12'},
    'q13': {'a': 'q14', 'b': 'q13'}, # NOTE: Image shows q13 'b' going to T, but data says q13.
                                   # We will add a T node for this based on the image structure.
    'q14': {'a': 'q16', 'b': 'q15'},
    'q15': {'a': 'q8', 'b': 'q17'},
    'q16': {'a': 'q18', 'b': 'q12'},
    'q17': {'a': 'q8', 'b': 'q19'},
    'q18': {'a': 'q19', 'b': 'q13'},
    'q19': {'a': 'q19', 'b': 'q19'},
}

# DFA configurations
# Only include the 'alphabet' configuration as specifically requested
dfa_configs = {
    'alphabet': {
        'transitions': alpha_nodes,
        'start_state': 'q0',
        'accept_states': {'q19'},
        'valid_symbols': {'a', 'b'}
    }
}

def generate_static_dfa_graph(dfa_type='alphabet'):
    """
    Generates a static, black and white Graphviz DOT representation for a given DFA.
    Includes explicit trap nodes ('T') for transitions mapping to None, and attempts
    to match the structure of the provided alphabet DFA image as closely as possible
    while remaining black and white.

    Args:
        dfa_type (str): The type of DFA ('alphabet' is the only one defined).

    Returns:
        str: The Graphviz DOT source code as a string, rendered as SVG.
    """
    if dfa_type not in dfa_configs:
        raise ValueError(f"Unknown DFA type: {dfa_type}. Choose from {list(dfa_configs.keys())}")

    config = dfa_configs[dfa_type]
    dot = graphviz.Digraph(format='svg')
    dot.attr(rankdir='LR') # Layout from Left to Right

    # Set global graph/node/edge attributes to enforce black and white
    dot.attr('graph', fontname='Arial', color='black')
    # Default node style: circle, solid border, white fill, black text/border
    dot.attr('node', shape='circle', style='solid', fontname='Arial', color='black', fillcolor='white')
    # Default edge style: black
    dot.attr('edge', fontname='Arial', color='black')


    # Add all regular states as nodes
    for state in config['transitions']:
        attrs = {
            'style': 'solid',
            'fillcolor': 'white', # White fill
            'fontsize': '12',
            'width': '0.6', # Match approximate relative size from image
            'height': '0.6',
            'color': 'black', # Black border
        }

        # Use double circle shape for accept states (still black/white)
        if state in config['accept_states']:
            attrs['shape'] = 'doublecircle'

        # No special styling for the start state node itself, the start arrow indicates it.

        dot.node(state, **attrs)

    # Add trap nodes and their transitions
    # Create distinct 'T' nodes for each transition to None, matching the image structure.
    trap_nodes_created = set()
    
    # Add trap nodes based on the provided alpha_nodes dictionary
    for state, transitions in config['transitions'].items():
        for symbol, next_state in transitions.items():
            if next_state is None:
                # Create a unique name for the trap node based on where the transition comes from
                trap_node_name = f'T_{state}_{symbol}'

                # Add the trap node if this specific one hasn't been created yet
                if trap_node_name not in trap_nodes_created:
                     trap_nodes_created.add(trap_node_name)
                     dot.node(trap_node_name, 'T', # Label is 'T'
                              shape='circle',
                              style='solid',
                              fillcolor='white', # White fill
                              color='black',     # Black border
                              fontsize='10',
                              width='0.5',       # Slightly smaller as in image
                              height='0.5')

                # Add the edge from the state+symbol to its specific trap node
                dot.edge(state, trap_node_name,
                         label=symbol,
                         fontsize='10',
                         arrowsize='0.5',
                         color='black') # Black edge

    # Handle the discrepancy for q13 'b' -> T, which is in the image but not the provided nodes data.
    # Add this specific trap node and transition to match the *image structure*.
    # We name it specifically to avoid collisions and indicate it's a visual addition.
    q13_b_trap_node_name = 'T_q13_b_VISUAL'
    if q13_b_trap_node_name not in trap_nodes_created:
        trap_nodes_created.add(q13_b_trap_node_name)
        dot.node(q13_b_trap_node_name, 'T',
                 shape='circle',
                 style='solid',
                 fillcolor='white',
                 color='black',
                 fontsize='10',
                 width='0.5',
                 height='0.5')
        # Add the edge from q13 on 'b' to this trap node
        dot.edge('q13', q13_b_trap_node_name,
                 label='b', # Label is 'b' as in the image
                 fontsize='10',
                 arrowsize='0.5',
                 color='black')


    # Add start indicator
    # Create an invisible node for the starting point
    dot.node('start_point', shape='point', width='0', height='0') # Make it invisible
    # Draw a black edge from the invisible node to the actual start state
    dot.edge('start_point', config['start_state'], arrowhead='normal', arrowsize='0.5', color='black')


    # Add transitions between regular states (those defined in config['transitions'])
    for from_state, transitions in config['transitions'].items():
        for symbol, to_state in transitions.items():
            # Add an edge only if the destination state is explicitly defined
            # AND is one of the original regular states.
            # Transitions to None (traps based on the data) were handled above.
            # The specific q13->b->T transition (visual) was handled above.
            if to_state is not None and to_state in config['transitions']:
                 dot.edge(from_state, to_state,
                         label=symbol,
                         fontsize='10',
                         arrowsize='0.5',
                         color='black') # Black edge


    # Render the graph and return SVG string
    return dot.pipe().decode('utf-8')

# --- Main execution block ---
if __name__ == "__main__":
    # Generate the static black and white graph for the 'alphabet' DFA
    # This function generates a diagram matching the requested structure and style
    svg_output = generate_static_dfa_graph(dfa_type='alphabet')

    # Define the output filename as requested by the user
    output_filename = 'ab_image_dfa.svg' # Use .svg extension for SVG format

    # Save the SVG output to the file
    try:
        with open(output_filename, 'w') as f:
            f.write(svg_output)
        print(f"DFA diagram saved to {output_filename}")
        print("Note: A discrepancy was found between the provided node data and the image for q13 'b' transition.")
        print("The diagram includes a transition from q13 on 'b' to a 'T' node to match the image structure,")
        print("although the provided 'alpha_nodes' maps q13 'b' to q13.")
    except IOError as e:
        print(f"Error saving file {output_filename}: {e}")