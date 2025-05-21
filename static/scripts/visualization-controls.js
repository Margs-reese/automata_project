// Handles selection state and visualization display for DFA, CFG, PDA buttons

document.addEventListener('DOMContentLoaded', () => {
    const dfaButton = document.getElementById('dfa-btn');
    const cfgButton = document.getElementById('cfg-btn');
    const pdaButton = document.getElementById('pda-btn');
    const visualizationCanvas = document.querySelector('.visualization-canvas');
    const regexContentDiv = document.getElementById('regex-content'); // To get current regex type
    const allVisualizationButtons = document.querySelectorAll('.selection-result-container button');

    // Function to handle selecting a button (add/remove 'selected' class)
    function handleButtonClick(clickedButton) {
        allVisualizationButtons.forEach(btn => {
            btn.classList.remove('selected'); // Remove 'selected' from all buttons
        });
        clickedButton.classList.add('selected'); // Add 'selected' to the clicked button
    }

    // Function to display the correct visualization based on type and selected regex
    function displayVisualization(type) {
        const regexType = regexContentDiv.dataset.type; // 'alphabet' or 'binary'

        // Clear previous visualization
        visualizationCanvas.innerHTML = '';
        visualizationCanvas.style.backgroundColor = 'hsl(0, 0%, 100%)'; // Reset background if it was changed

        let imagePath = '';
        let elementType = 'img'; // Default to img tag

        if (type === 'cfg') {
            if (regexType === 'alphabet') {
                // --- Assign the correct file path for ab-cfg.png here ---
                imagePath = '../static/images/ab-cfg.png';
            } else if (regexType === 'binary') {
                 // --- Assign the correct file path for 01-cfg.png here ---
                imagePath = '../static/images/01-cfg.png';
            }
             // Element type for PNGs is img
             elementType = 'img';
             visualizationCanvas.style.backgroundColor = '#2A252F'; // Set darker background for CFG images as shown in example
        } else if (type === 'pda') {
             if (regexType === 'alphabet') {
                // --- Assign the correct file path for ab-cfg.svg here ---
                imagePath = '../static/images/ab-cfg.svg';
            } else if (regexType === 'binary') {
                // --- Assign the correct file path for 01-cfg.svg here ---
                imagePath = '../static/images/01-cfg.svg';
            }
            // Element type for SVGs displayed with <img> tag
            elementType = 'img';
             visualizationCanvas.style.backgroundColor = 'hsl(0, 0%, 100%)'; // Keep white background for SVGs
        } else if (type === 'dfa') {
            console.log('DFA visualization not yet implemented.');
            // For now, just clear the canvas and show placeholder or nothing
            // Add DFA visualization logic here when ready
            const placeholder = document.createElement('div');
            placeholder.textContent = 'DFA Visualization Here (Functionality Commented Out)';
            placeholder.style.color = '#1E1E23';
            placeholder.style.fontFamily = 'Inter, sans-serif';
            placeholder.style.fontSize = '20px';
            visualizationCanvas.appendChild(placeholder);
            visualizationCanvas.style.backgroundColor = 'hsl(0, 0%, 100%)'; // Keep white background for DFA
        } else {
            console.error('Unknown visualization type:', type);
            return;
        }

        // If an image path was determined, create and append the element
        if (imagePath) {
             // Create the image element
            const imgElement = document.createElement(elementType);
            imgElement.src = imagePath;
            imgElement.alt = `${type.toUpperCase()} Diagram for Regex Type: ${regexType}`; // Add alt text for accessibility

            // Append the element to the canvas
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