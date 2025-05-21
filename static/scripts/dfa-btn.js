// select dfa-btn id = 'dfa-btn' (from compiler.html)

document.addEventListener('DOMContentLoaded', () => {
    const dfaButton = document.getElementById('dfa-btn');
    const buttons = document.querySelectorAll('.selection-result-container button');

    if (dfaButton) {
        dfaButton.addEventListener('click', () => {
            console.log('DFA button clicked!');
            // Logic to handle button selection state (optional based on final UI)
            handleButtonClick(dfaButton, buttons);
        });
    } else {
        console.error('DFA button not found.');
    }

    // Function to handle selecting a button (add/remove 'selected' class)
    function handleButtonClick(clickedButton, allButtons) {
        allButtons.forEach(btn => {
            btn.classList.remove('selected'); // Remove 'selected' from all buttons
        });
        clickedButton.classList.add('selected'); // Add 'selected' to the clicked button
    }
});