// ../static/assets/01-cfg.png
// Handles selection state and visualization display for DFA, CFG, PDA buttons

document.addEventListener('DOMContentLoaded', () => {
    const dfaButton = document.getElementById('dfa-btn');
    const cfgButton = document.getElementById('cfg-btn');
    const pdaButton = document.getElementById('pda-btn');
    const visualizationCanvas = document.querySelector('.visualization-canvas');
    const regexContentDiv = document.getElementById('regex-content');
    const allVisualizationButtons = document.querySelectorAll('.selection-result-container button');

    function handleButtonClick(clickedButton) {
        allVisualizationButtons.forEach(btn => {
            btn.classList.remove('selected');
        });
        clickedButton.classList.add('selected');
    }

    function displayVisualization(type) {
        const regexType = regexContentDiv.dataset.type;

        visualizationCanvas.innerHTML = '';
        let visualElement = null; // Element to append to the canvas

        let imagePath = '';
        let elementType = 'img';

        if (type === 'cfg') {
            if (regexType === 'alphabet') {
                imagePath = '../static/assets/ab-cfg.png';
            } else if (regexType === 'binary') {
                imagePath = '../static/assets/01-cfg.png';
            }
             elementType = 'img';
        } else if (type === 'pda') {
             if (regexType === 'alphabet') {
                imagePath = '../static/assets/ab-pda.svg';
            } else if (regexType === 'binary') {
                imagePath = '../static/assets/01-pda.svg';
            }
            elementType = 'img';
        } else if (type === 'dfa') {
            console.log('DFA visualization clicked!');
            if (regexType === 'alphabet') {
                 imagePath = '../static/assets/ab_image_dfa.svg';
             } else if (regexType === 'binary') {
                 imagePath = '../static/assets/01_image_dfa.svg';
             }
             elementType = 'img';
        } else {
            console.error('Unknown visualization type:', type);
            return;
        }

        if (imagePath) {
             const imgElement = document.createElement(elementType);
             imgElement.src = imagePath;
             imgElement.alt = `${type.toUpperCase()} Diagram for Regex Type: ${regexType}`;

             if (type === 'dfa') {
                 imgElement.style.maxWidth = '1089px';
                 imgElement.style.maxHeight = '450px';
                 imgElement.style.width = 'auto'; 
                 imgElement.style.height = 'auto'; 
             }

             visualElement = imgElement;
        }


        if (visualElement) {
            visualizationCanvas.appendChild(visualElement);
        }
    }

    // Add click listeners to the buttons

    if (dfaButton) {
        dfaButton.addEventListener('click', () => {
            console.log('DFA button clicked!');
            handleButtonClick(dfaButton);
            displayVisualization('dfa');
        });
    } else {
        console.error('DFA button not found.');
    }

    if (cfgButton) {
        cfgButton.addEventListener('click', () => {
            console.log('CFG button clicked!');
            handleButtonClick(cfgButton);
            displayVisualization('cfg');
        });
    } else {
        console.error('CFG button not found.');
    }

    if (pdaButton) {
        pdaButton.addEventListener('click', () => {
            console.log('PDA button clicked!');
            handleButtonClick(pdaButton);
            displayVisualization('pda');
        });
    } else {
        console.error('PDA button not found.');
    }
});