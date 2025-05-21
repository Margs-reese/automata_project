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
      } else {
        console.error("No graph SVG received from backend");
      }
    } catch (error) {
      console.error("Validation error:", error);
      showError("Invalid character input for chosen regex");
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

    // Show the appropriate label
    if (isValid) {
      validLabel.style.display = "flex";
    } else {
      invalidLabel.style.display = "flex";
    }
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
});
