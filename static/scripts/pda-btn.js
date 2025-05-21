// select pda-btn id = 'pda-btn' (from compiler.html)

document.addEventListener('DOMContentLoaded', () => {
    const pdaButton = document.getElementById('pda-btn');
    const buttons = document.querySelectorAll('.selection-result-container button'); // Get all buttons in the container

    if (pdaButton) {
        pdaButton.addEventListener('click', () => {
            console.log('PDA button clicked!');
            // Logic to handle button selection state
            handleButtonClick(pdaButton, buttons);
        });
    } else {
        console.error('PDA button not found.');
    }

    // Function to handle selecting a button (add/remove 'selected' class)
    function handleButtonClick(clickedButton, allButtons) {
        allButtons.forEach(btn => {
            btn.classList.remove('selected'); // Remove 'selected' from all buttons
        });
        clickedButton.classList.add('selected'); // Add 'selected' to the clicked button
    }
});