// ../static/assets/01-cfg.png
// Handles selection state and visualization display for DFA, CFG, PDA buttons

document.addEventListener('DOMContentLoaded', () => {
    const dfaButton = document.getElementById('dfa-btn');
    const cfgButton = document.getElementById('cfg-btn');
    const pdaButton = document.getElementById('pda-btn');
    const visualizationCanvas = document.querySelector('.visualization-canvas');
    const regexContentDiv = document.getElementById('regex-content');
    const allVisualizationButtons = document.querySelectorAll('.selection-result-container button');
    const vizCanvas = document.querySelector(".visualization-canvas");
    const content = document.getElementById("visualization-content");
    let scale = 1;
    const scaleStep = 0.1;
    const minScale = 0.2;
    const maxScale = 3;

    

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

 // Double-click to toggle fullscreen
  vizCanvas.addEventListener("dblclick", function () {
    vizCanvas.classList.toggle("fullscreen");
    // Reset zoom and pan when exiting fullscreen
    if (!vizCanvas.classList.contains("fullscreen")) {
      scale = 1;
      content.style.transform = `scale(${scale}) translate(0px, 0px)`;
      document.body.style.overflow = "";
      content.dataset.panX = "0";
      content.dataset.panY = "0";
    } else {
      document.body.style.overflow = "hidden";
    }
  });

  // Zoom only when in fullscreen
  vizCanvas.addEventListener("wheel", function (e) {
    if (!vizCanvas.classList.contains("fullscreen")) return;
    e.preventDefault();
    if (e.deltaY < 0) {
      // Zoom in
      scale = Math.min(maxScale, scale + scaleStep);
    } else {
      // Zoom out
      scale = Math.max(minScale, scale - scaleStep);
    }
    updateTransform();
  });

  // Drag-to-pan functionality
  let isDragging = false;
  let startX, startY, panX = 0, panY = 0;

  content.addEventListener("mousedown", function (e) {
    if (!vizCanvas.classList.contains("fullscreen") || scale === 1) return;
    isDragging = true;
    startX = e.clientX - panX;
    startY = e.clientY - panY;
    content.style.cursor = "grabbing";
  });

  document.addEventListener("mousemove", function (e) {
    if (!isDragging) return;
    panX = e.clientX - startX;
    panY = e.clientY - startY;
    updateTransform();
  });

  document.addEventListener("mouseup", function () {
    if (isDragging) {
      isDragging = false;
      content.style.cursor = "grab";
    }
  });

  function updateTransform() {
    content.style.transform = `scale(${scale}) translate(${panX / scale}px, ${panY / scale}px)`;
    content.dataset.panX = panX;
    content.dataset.panY = panY;
  }

  // Reset pan when zoom resets
  vizCanvas.addEventListener("dblclick", function () {
    panX = 0;
    panY = 0;
    updateTransform();
  });
});