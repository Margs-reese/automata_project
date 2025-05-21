import graphviz

binary_nodes ={
    'q1': {'1': 'q1', '0': 'q2'},
    'q2': {'1': 'q2', '0': 'q3'},
    'q3': {'1': '', '0': 'q4'},
    'q4': {'1': None, '0': 'q5'},
    'q5': {'1': 'q7', '0': 'q6'},
    }

alpha_nodes ={
    'q1': {'a': 'q2', 'b': 'q3'},
    'q2': {'a': 'q4', 'b': None},
    'q3': {'a': None, 'b': 'q4'},
    'q4': {'a': 'q5', 'b': 'q6'},
    'q5': {'a': None, 'b': 'q7'},
    'q6': {'a': 'q8', 'b': 'q8'},
    'q7': {'a': 'q9', 'b': None},
    'q8': {'a': None, 'b': 'q9'},
    'q9': {'a': 'q10', 'b': 'q11'},
    'q10': {'a': 'q12', 'b': 'q11'},
    'q11': {'a': 'q10', 'b': 'q12'},
    'q12': {'a': 'q13', 'b': 'q11'},
    'q13': {'a': 'q14', 'b': 'q13'},
    'q14': {'a': 'q15', 'b': 'q14'},
    'q15': {'a': 'q17', 'b': 'q16'},
    'q16': {'a': 'q9', 'b': 'q18'},
    'q17': {'a': 'q19', 'b': 'q13'},
    'q18': {'a': 'q9', 'b': 'q20'},
    'q19': {'a': 'q20', 'b': 'q14'},
    'q20': {'a': 'q20', 'b': 'q20'},
}

# DFA configurations
dfa_configs = {
    'binary': {
        'transitions': binary_nodes,
        'start_state': 'q1',
        'accept_states': {'q26', 'q27'},
        'valid_symbols': {'0', '1'}
    },
    'alphabet': {
        'transitions': alpha_nodes,
        'start_state': 'q1',
        'accept_states': {'q20'},
        'valid_symbols': {'a', 'b'}
    }
}


def simulate_dfa(input_string, dfa_type='binary'):
    config = dfa_configs[dfa_type]
    current_state = config['start_state']
    visited = {current_state}
    path = []

    for symbol in input_string:
        if symbol not in config['valid_symbols']:
            break
        next_state = config['transitions'].get(current_state, {}).get(symbol)
        if not next_state:
            break
        path.append((current_state, next_state, symbol))
        visited.add(next_state)
        current_state = next_state

    accepted = current_state in config['accept_states']
    return path, visited, accepted

def generate_graph(path, visited, dfa_type='binary'):
    config = dfa_configs[dfa_type]
    dot = graphviz.Digraph(format='svg')
    dot.attr(rankdir='LR')
    dot.attr('node', shape='circle', style='filled', fontname='Arial')
    dot.attr('edge', fontname='Arial')

    # Add nodes
    for state in config['transitions']:
        attrs = {
            'style': 'filled',
            'fillcolor': '#f8f9fa',
            'fontsize': '12',
            'width': '0.6',
            'height': '0.6',
            'id': f'node_{state}'
        }
        
        if state in config['accept_states']:
            attrs['shape'] = 'doublecircle'
            attrs['fillcolor'] = '#d4edda'
        if state in visited:
            attrs['color'] = '#007bff'
            attrs['penwidth'] = '2'
        dot.node(state, **attrs)

    # Add start arrow
    dot.node('start', shape='point', width='0.1', height='0.1')
    dot.edge('start', config['start_state'], arrowhead='normal', arrowsize='0.5')

    # Add transitions with IDs for animation
    for from_state, transitions in config['transitions'].items():
        for symbol, to_state in transitions.items():
            if to_state:
                is_in_path = any(p[0] == from_state and p[1] == to_state and p[2] == symbol for p in path)
                attrs = {
                    'label': symbol,
                    'fontsize': '10',
                    'arrowsize': '0.5',
                    'id': f'edge_{from_state}_{to_state}_{symbol}'
                }
                if is_in_path:
                    attrs['color'] = '#007bff'
                    attrs['penwidth'] = '2'
                dot.edge(from_state, to_state, **attrs)

    # Add animation information
    animation_data = {
        'path': path,
        'start_state': config['start_state'],
        'accept_states': list(config['accept_states'])
    }

    return dot.pipe().decode('utf-8'), animation_data