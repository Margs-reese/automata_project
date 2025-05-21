import graphviz

# Using distinct names for the two trap states internally, but will label them 'T' in the graph.
ab_image_dfa_transitions = {
    'q0': {'a': 'q1', 'b': 'q2'},
    'q1': {'a': 'q3', 'b': 'T_top'}, 
    'q2': {'a': 'T_bottom', 'b': 'q3'}, 
    'q3': {'a': 'q4', 'b': 'q5'},
    'q4': {'a': 'T_top', 'b': 'q6'},
    'q5': {'a': 'q7', 'b': 'q7'}, 
    'q6': {'a': 'q8', 'b': 'T_top'}, 
    'q7': {'a': 'T_bottom', 'b': 'q8'}, 
    'q8': {'a': 'q9', 'b': 'q10'},
    'q9': {'a': 'q11', 'b': 'q10'},
    'q10': {'a': 'q9', 'b': 'q11'},
    'q11': {'a': 'q12', 'b': 'q10'},
    'q12': {'a': 'q13', 'b': 'q12'},
    'q13': {'a': 'q14', 'b': 'q13'}, 
    'q14': {'a': 'q16', 'b': 'q15'},
    'q15': {'a': 'q8', 'b': 'q17'}, 
    'q16': {'a': 'q18', 'b': 'q12'},
    'q17': {'a': 'q8', 'b': 'q19'}, 
    'q18': {'a': 'q19', 'b': 'q13'},
    'q19': {'a': 'q19', 'b': 'q19'},      
    'T_top': {'a': 'T_top', 'b': 'T_top'}, 
    'T_bottom': {'a': 'T_bottom', 'b': 'T_bottom'} 
}

# Define the DFA configuration
ab_image_dfa_config = {
    'transitions': ab_image_dfa_transitions,
    'start_state': 'q0',
    'accept_states': {'q19'},
    'valid_symbols': {'a', 'b'}
}

def generate_dfa_graph(dfa_config):
    """
    Generates a Graphviz Digraph object for a given DFA configuration,
    mimicking the appearance of the provided image, including combined a,b labels
    and grouped transitions where shown in the image.
    """
    dot = graphviz.Digraph(comment='DFA from Image with Corrections')
    dot.attr(rankdir='LR') # Layout direction Left-to-Right
    dot.attr('node', shape='circle', fontname='Arial', fontsize='12') 
    dot.attr('edge', fontname='Arial', fontsize='10', arrowsize='0.5') 

    # Collect all states involved (keys and targets)
    all_states = set(dfa_config['transitions'].keys())
    for state_transitions in dfa_config['transitions'].values():
         all_states.update(state_transitions.values())
    all_states.discard(None) # Remove None if present

    # Add nodes
    # Sort states for consistent output order in the dot file (Graphviz layout may rearrange)
    sorted_states = sorted(list(all_states))

    for state in sorted_states:
        attrs = {}
        node_label = state
        if state in dfa_config['accept_states']:
            attrs['shape'] = 'doublecircle' 
        if state == 'T_top' or state == 'T_bottom':
             node_label = 'T' # Explicitly label internal trap states as 'T'

        dot.node(state, node_label, **attrs)

    # Add start arrow
    start_state = dfa_config['start_state']
    # Create an invisible node for the start arrow source
    dot.node('start', shape='point', width='0.1', height='0.1')
    dot.edge('start', start_state, arrowhead='normal', arrowsize='0.5')

    # Group transitions by (from_state, to_state) to handle combined labels
    # Only group transitions if they go to the *exact* same target state.
    grouped_transitions = {}
    for from_state, transitions in dfa_config['transitions'].items():
        for symbol, to_state in transitions.items():
            if to_state is not None:
                # Use (from_state, to_state) as the key
                key = (from_state, to_state)
                if key not in grouped_transitions:
                    grouped_transitions[key] = []
                # Add the symbol to the list for this (from, to) pair
                # Ensure 'a' comes before 'b' for consistent 'a,b' label if both exist
                if symbol not in grouped_transitions[key]: # Avoid duplicates
                   grouped_transitions[key].append(symbol)


    # Draw edges based on grouped transitions
    for (from_state, to_state), symbols in grouped_transitions.items():
        
        symbols.sort()
        label = ','.join(symbols)

        edge_id = f"edge_{from_state}_{to_state}_{'_'.join(symbols)}"

        dot.edge(from_state, to_state, label=label, id=edge_id)


    return dot

# Main execution block
if __name__ == "__main__":
    dfa_to_draw = ab_image_dfa_config

    dot_graph = generate_dfa_graph(dfa_to_draw)

    output_filename = 'ab_image_dfa'
    output_format = 'svg'

    try:
        # Use the render method to directly save the file
        dot_graph.render(output_filename, format=output_format, view=False, cleanup=True)
        print(f"DFA graph successfully saved as {output_filename}.{output_format}")

    except graphviz.backend.ExecutableNotFound:
        print("Error: 'dot' executable not found. Make sure Graphviz is installed and in your system's PATH.")
        print("See installation instructions: https://graphviz.org/download/")
    except Exception as e:
        print(f"An error occurred while generating or saving the graph: {e}")