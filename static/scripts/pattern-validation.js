// pattern input area id = 'pattern-input' (from compiler.html)
// pattern validation button id = 'pattern-validation-btn' (from compiler.html)

document.addEventListener("DOMContentLoaded", () => {
  // Get DOM elements
  const patternInput = document.getElementById("pattern-input");
  const validateButton = document.getElementById("pattern-validation-btn");
  const validLabel = document.getElementById("valid-label");
  const invalidLabel = document.getElementById("invalid-label");
  const visualizationCanvas = document.querySelector(".visualization-canvas");

  // Add click event listener to validation button
  validateButton.addEventListener("click", handleValidation);

  // Function to handle validation button click
  async function handleValidation() {
    const inputText = patternInput.value;
    console.log("Input pattern received:", inputText);

    try {
      const response = await validateString(inputText);
      console.log("Backend response:", response);
      
      if (response.error) {
        // Display error message
        showError(response.error);
        updateValidationUI(false);
        return;
      }

      updateValidationUI(response.result === 'Accepted');
      if (response.graph_svg) {
        displayGraph(response.graph_svg);
        // Start animation if animation data is available
        if (response.animation_data) {
          startAnimation(response.animation_data);
        }
      } else {
        console.error("No graph SVG received from backend");
      }
    } catch (error) {
      console.error("Validation error:", error);
      showError("An error occurred while validating the input");
      updateValidationUI(false);
    }
  }

  // Function to show error message
  function showError(message) {
    // Create error notification if it doesn't exist
    let errorNotification = document.getElementById('error-notification');
    if (!errorNotification) {
      errorNotification = document.createElement('div');
      errorNotification.id = 'error-notification';
      errorNotification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #dc3545;
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        z-index: 1000;
        font-family: 'Inter', sans-serif;
        max-width: 400px;
      `;
      document.body.appendChild(errorNotification);
    }

    // Set error message
    errorNotification.textContent = message;

    // Remove error notification after 5 seconds
    setTimeout(() => {
      errorNotification.remove();
    }, 5000);
  }

  // Function to update the UI based on validation result
  function updateValidationUI(isValid) {
    // Hide both labels first
    validLabel.style.display = "none";
    invalidLabel.style.display = "none";

    // Get the result container
    const resultContainer = document.getElementById('result-container');
    
    // Add transition class
    resultContainer.classList.add('result-transition');
    
    // Set the appropriate color
    if (isValid) {
      resultContainer.style.backgroundColor = '#28a745';  // Green
      validLabel.style.display = "flex";
    } else {
      resultContainer.style.backgroundColor = '#dc3545';  // Red
      invalidLabel.style.display = "flex";
    }

    // Reset the color after 3 seconds
    setTimeout(() => {
      resultContainer.style.backgroundColor = '#373746';  // Original color
      resultContainer.classList.remove('result-transition');
    }, 3000);
  }

  // Function to display the graph
  function displayGraph(svgContent) {
    console.log("Displaying graph:", svgContent);
    if (visualizationCanvas) {
      // Remove any existing graph
      const existingGraph = visualizationCanvas.querySelector('svg');
      if (existingGraph) {
        existingGraph.remove();
      }
      
      // Insert the new graph
      visualizationCanvas.innerHTML = svgContent;
    }
  }

  // Function to validate string against backend
  async function validateString(string) {
    try {
      const formData = new FormData();
      formData.append('input_string', string);
      const regexContent = document.getElementById('regex-content');
      formData.append('regex', regexContent.dataset.type);

      console.log("Sending to backend:", {
        input_string: string,
        regex: regexContent.dataset.type
      });

      const response = await fetch("http://localhost:5000/validateString", {
        method: "POST",
        body: formData
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }
      
      console.log("Received from backend:", data);
      return data;
    } catch (error) {
      console.error("Error validating string:", error);
      throw error;
    }
  }

  // Function to animate the DFA path
  function startAnimation(animationData) {
    let currentStep = 0;

    function animateStep() {
      if (currentStep >= animationData.path.length) {
        // Get the final state
        const lastStep = animationData.path[animationData.path.length - 1];
        const finalState = lastStep[1];
        
        // Highlight the final node in red
        const finalNode = document.getElementById(`node_${finalState}`);
        if (finalNode) {
          finalNode.style.fill = '#dc3545';  // Red color
          finalNode.style.stroke = '#bd2130';  // Darker red for border
          finalNode.style.strokeWidth = '3px';
        }
        return;
      }

      const step = animationData.path[currentStep];
      const fromState = step[0];
      const toState = step[1];
      const symbol = step[2];

      // Highlight the current node
      const node = document.getElementById(`node_${fromState}`);
      if (node) {
        node.classList.add("highlight-node");
        setTimeout(() => node.classList.remove("highlight-node"), 1000);
      }

      // Highlight the edge
      const edge = document.getElementById(
        `edge_${fromState}_${toState}_${symbol}`
      );
      if (edge) {
        edge.classList.add("highlight-edge");
        setTimeout(() => edge.classList.remove("highlight-edge"), 1000);
      }

      // Move to next step
      currentStep++;
      setTimeout(animateStep, 1000);
    }

    // Start animation after a short delay
    setTimeout(animateStep, 500);
  }
});
