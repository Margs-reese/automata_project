// select rejex button id = 'select-rejex-btn' (from compiler.html)
const selectRejexButton = document.querySelector('#select-rejex-btn');

if (selectRejexButton) {
    selectRejexButton.addEventListener('click', () => {
        console.log('Select Rejex button clicked!'); // msg printed when run simulation btn is clicked (for debugging)
        // Add func. here
    });
}