# 01-dfa.py

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
    'q22': {'1': 'q21', '0': 'q21'},
    }

dfa_configs = {
    'binary': {
        'transitions': binary_nodes,
        'start_state': 'q0',
        'accept_states': {'q21'},
        'valid_symbols': {'0', '1'}
    }
}

def generate_static_dfa_graph(dfa_type='binary'):
    if dfa_type not in dfa_configs:
        raise ValueError(f"Unknown DFA type: {dfa_type}. Choose from {list(dfa_configs.keys())}")

    config = dfa_configs[dfa_type]
    dot = graphviz.Digraph(format='svg')
    dot.attr(rankdir='LR')

    dot.attr('graph', fontname='Arial', color='black')
    dot.attr('node', shape='circle', style='solid', fontname='Arial', color='black', fillcolor='white')
    dot.attr('edge', fontname='Arial', color='black')

    for state in config['transitions']:
        attrs = {
            'style': 'solid',
            'fillcolor': 'white',
            'fontsize': '12',
            'width': '0.6',
            'height': '0.6',
            'color': 'black',
        }

        if state in config['accept_states']:
            attrs['shape'] = 'doublecircle'

        dot.node(state, **attrs)

    trap_nodes_created = set()

    for state, transitions in config['transitions'].items():
        for symbol, next_state in transitions.items():
            if next_state is None:
                trap_node_name = f'T_{state}_{symbol}'

                if trap_node_name not in trap_nodes_created:
                     trap_nodes_created.add(trap_node_name)
                     dot.node(trap_node_name, 'T',
                              shape='circle',
                              style='solid',
                              fillcolor='white',
                              color='black',
                              fontsize='10',
                              width='0.5',
                              height='0.5')

                dot.edge(state, trap_node_name,
                         label=symbol,
                         fontsize='10',
                         arrowsize='0.5',
                         color='black')


    dot.node('start_point', shape='point', width='0', height='0')
    dot.edge('start_point', config['start_state'], arrowhead='normal', arrowsize='0.5', color='black')

    for from_state, transitions in config['transitions'].items():
        for symbol, to_state in transitions.items():
            if to_state is not None and to_state in config['transitions']:
                 dot.edge(from_state, to_state,
                         label=symbol,
                         fontsize='10',
                         arrowsize='0.5',
                         color='black')

    return dot.pipe().decode('utf-8')

if __name__ == "__main__":
    svg_output = generate_static_dfa_graph(dfa_type='binary')

    output_filename = '01_image_dfa.svg'

    try:
        with open(output_filename, 'w') as f:
            f.write(svg_output)
        print(f"DFA diagram saved to {output_filename}")
    except IOError as e:
        print(f"Error saving file {output_filename}: {e}")