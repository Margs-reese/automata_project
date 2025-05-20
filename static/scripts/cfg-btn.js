// select cfg-btn id = 'cfg-btn' (from compiler.html)

document.addEventListener('DOMContentLoaded', () => {
    const cfgButton = document.getElementById('cfg-btn');
     const buttons = document.querySelectorAll('.selection-result-container button'); // Get all buttons in the container

    if (cfgButton) {
        cfgButton.addEventListener('click', () => {
            console.log('CFG button clicked!');
             // Logic to handle button selection state
            handleButtonClick(cfgButton, buttons);
        });
    } else {
        console.error('CFG button not found.');
    }

    // Function to handle selecting a button (add/remove 'selected' class)
    function handleButtonClick(clickedButton, allButtons) {
        allButtons.forEach(btn => {
            btn.classList.remove('selected'); // Remove 'selected' from all buttons
        });
        clickedButton.classList.add('selected'); // Add 'selected' to the clicked button
    }
});