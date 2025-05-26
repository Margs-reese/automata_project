import graphviz

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

dfa_configs = {
    'alphabet': {
        'transitions': alpha_nodes,
        'start_state': 'q0',
        'accept_states': {'q19'},
        'valid_symbols': {'a', 'b'}
    }
}

def generate_static_dfa_graph(dfa_type='alphabet'):
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
    svg_output = generate_static_dfa_graph(dfa_type='alphabet')

    output_filename = 'ab_image_dfa.svg'

    try:
        with open(output_filename, 'w') as f:
            f.write(svg_output)
        print(f"DFA diagram saved to {output_filename}")
    except IOError as e:
        print(f"Error saving file {output_filename}: {e}")