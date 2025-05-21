import graphviz

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
    'q1': {'a': 'q3', 'b': None},
    'q2': {'a': None, 'b': 'q3'},
    'q3': {'a': 'q4', 'b': 'q5'},
    'q4': {'a': None, 'b': 'q6'},
    'q5': {'a': 'q7', 'b': 'q7'},
    'q6': {'a': 'q8', 'b': None},
    'q7': {'a': None, 'b': 'q8'},
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