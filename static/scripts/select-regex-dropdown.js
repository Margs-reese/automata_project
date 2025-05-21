// select regex pattern displyed  id='regex-content' (from compiler.html)
// regex dropdown selection button id='select-rejex-btn' (from compiler.html)
// dropdown option 1  id='regex-option1-ab' (from compiler.html)
// dropdown option 2 id='regex-option2-01' (from compiler.html)

document.addEventListener('DOMContentLoaded', function () {
    const dropdownTrigger = document.getElementById('select-rejex-btn');
    const dropdownContent = document.querySelector('.dropdown-container .dropdown-content');
    const dropdownContainer = document.getElementById('select-rejex-dropdown-container');
    const option1 = document.getElementById('regex-option1-ab');
    const option2 = document.getElementById('regex-option2-01');
    const regexContentDiv = document.getElementById('regex-content'); // Get the regex content div

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
    if (option1 && option2 && dropdownTrigger && regexContentDiv) { // Ensure regexContentDiv is found
        option1.addEventListener('click', function () {
            // Handle selection of option 1
            console.log('Regex option selected: {a, b}');
            dropdownTrigger.textContent = 'Selected Regex: {a, b}'; // Update button text
            // Update regex content div
            regexContentDiv.textContent = '(aa+bb)(aba+bab+bbb)(a+b)*(aa+bb)(aa+bb)*(ab*ab*a)(ab*ab*a)*(bbb+aaa)(a+b)*';
            closeDropdown(); // Close dropdown
            // Add logic here to use the selected regex (e.g., update pattern-input, etc.)
        });

        option2.addEventListener('click', function () {
            // Handle selection of option 2
            console.log('Regex option selected: {1, 0}');
            dropdownTrigger.textContent = 'Selected Regex: {1, 0}'; // Update button text
            // Update regex content div
            regexContentDiv.textContent = '(1*01*01*)(11+00)(10+01)*(1+0)(11+00)(1+0+11+00+101+111+000)(11+00)*(10*10*1)(11+00)*';
            closeDropdown(); // Close dropdown
            // Add logic here to use the selected regex (e.g., update pattern-input, etc.)
        });
    }
});