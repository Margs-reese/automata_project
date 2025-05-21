// ../static/assets/01-cfg.png

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

        // Clear previous visualization
        visualizationCanvas.innerHTML = '';

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
            console.log('DFA visualization not yet implemented.');
            const placeholder = document.createElement('div');
            placeholder.textContent = 'DFA Visualization Here';
            placeholder.style.color = '#1E1E23'; 
            placeholder.style.fontFamily = 'Inter, sans-serif';
            placeholder.style.fontSize = '20px';
            visualizationCanvas.appendChild(placeholder);
             // Removed the line setting background color for DFA
        } else {
            console.error('Unknown visualization type:', type);
            return;
        }

        // If an image path was determined, create and append the element
        if (imagePath) {
            const imgElement = document.createElement(elementType);
            imgElement.src = imagePath;
            imgElement.alt = `${type.toUpperCase()} Diagram for Regex Type: ${regexType}`; // Add alt text for accessibility

            visualizationCanvas.appendChild(imgElement);
        }
    }

    // Add click listeners to the buttons

    // Commenting out DFA button functionality as requested
    // if (dfaButton) {
    //     dfaButton.addEventListener('click', () => {
    //         console.log('DFA button clicked!');
    //         handleButtonClick(dfaButton);
    //         displayVisualization('dfa');
    //     });
    // } else {
    //     console.error('DFA button not found.');
    // }

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

    // Optional: Display a default visualization on page load
    // For example, trigger a click on the DFA button after DOM is loaded and regex is set
    // This part depends on whether you want a default view or require the user to click a button first.
    // If you want a default (e.g., DFA for the initial binary regex), you could uncomment/add:
    // const initialButton = document.getElementById('dfa-btn'); // Or cfg-btn, pda-btn
    // if (initialButton) {
    //    initialButton.click(); // Simulate a click on the default button
    // }
});