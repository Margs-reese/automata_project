document.addEventListener('DOMContentLoaded', function () {
    const dropdownTrigger = document.getElementById('select-rejex-btn');
    const dropdownContent = document.querySelector('.dropdown-container .dropdown-content');
    const dropdownContainer = document.getElementById('select-rejex-dropdown-container');
    const option1 = document.getElementById('regex-option1-ab');
    const option2 = document.getElementById('regex-option2-01');

    // Function to close the dropdown
    function closeDropdown() {
        if (dropdownContent) {
            dropdownContent.classList.remove('show');
        }
    }

    // Toggle dropdown visibility when the trigger is clicked
    if (dropdownTrigger && dropdownContent) {
        dropdownTrigger.addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation(); // Prevent document click listener from firing immediately
            dropdownContent.classList.toggle('show');
        });
    }

    // Close the dropdown if the user clicks outside of it
    document.addEventListener('click', function (event) {
        if (dropdownContainer && !dropdownContainer.contains(event.target)) {
            closeDropdown();
        }
    });

    // Handle clicks on dropdown options
    if (option1 && option2 && dropdownTrigger) {
        option1.addEventListener('click', function () {
            // Handle selection of option 1
            console.log('Regex option selected: {a, b}');
            dropdownTrigger.textContent = '{a, b}'; // Update button text
            closeDropdown(); // Close dropdown
            // Add logic here to use the selected regex (e.g., update pattern-input, etc.)
        });

        option2.addEventListener('click', function () {
            // Handle selection of option 2
            console.log('Regex option selected: {1, 0}');
            dropdownTrigger.textContent = '{1, 0}'; // Update button text
            closeDropdown(); // Close dropdown
            // Add logic here to use the selected regex (e.g., update pattern-input, etc.)
        });
    }
});