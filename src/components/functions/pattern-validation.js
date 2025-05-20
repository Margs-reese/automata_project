// pattern input area id = 'pattern-input' (from compiler.html)
const patternInput = document.getElementById('pattern-input');
// pattern validation button id = 'pattern-validation-btn' (from compiler.html)
const validateButton = document.getElementById('pattern-validation-btn');

if (validateButton && patternInput) {
    validateButton.addEventListener('click', () => {
        // Get the text content from the input area
        const inputText = patternInput.value;
        console.log('Input pattern received:', inputText); // Log the received input (for debugging)
        // Add your validation logic here...
    });
} else {
    console.error('Pattern input or validation button not found.');
}