// pattern input area id = 'pattern-input' (from compiler.html)
// pattern validation button id = 'pattern-validation-btn' (from compiler.html)

document.addEventListener('DOMContentLoaded', () => {
    // Get the input area (textarea) and the validation button
    const patternInput = document.getElementById('pattern-input');
    const validateButton = document.getElementById('pattern-validation-btn');
    // Get the valid/invalid label elements
    const validLabel = document.getElementById('valid-label');
    const invalidLabel = document.getElementById('invalid-label');
    // The result container itself is assumed to be always visible

    // Ensure all necessary elements exist before adding listeners
    if (validateButton && patternInput && validLabel && invalidLabel) {
        validateButton.addEventListener('click', () => {
            // Get the text content from the input area
            const inputText = patternInput.value;
            console.log('Input pattern received:', inputText); // Log the received input

            // --- Debugging/Testing Logic to Toggle Result Label ---
            // This is temporary logic for debugging. In a real application,
            // you would replace this with the actual validation function call
            // that returns true if the input is "valid", and false the input is not the word "valid".
            const isValidResult = inputText.toLowerCase().includes('valid');
            console.log(`Debugging Result: ${isValidResult ? 'Valid' : 'Invalid'}`);
            // --- End Debugging Logic ---


            // Hide both labels first
            validLabel.style.display = 'none';
            invalidLabel.style.display = 'none';

            // Show the appropriate label based on the validation result
            if (isValidResult) {
                validLabel.style.display = 'flex'; // Show VALID label
            } else {
                invalidLabel.style.display = 'flex'; // Show INVALID label
            }
        });
    } else {
        console.error('One or more required elements for pattern validation not found.');
    }
});