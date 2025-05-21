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
    const regexContentDiv = document.getElementById('regex-content');

    // Store the full regex patterns
    const regexPatterns = {
        'binary': '(1*01*01*)(11+00)(10+01)*(1+0)(11+00)(1+0+11+00+101+111+000)(11+00)*(10*10*1)(11+00)*',
        'alphabet': '(aa+bb)(aba+bab+bbb)(a+b)*(aa+bb)(aa+bb)*(ab*ab*a)(ab*ab*a)*(bbb+aaa)(a+b)*'
    };

    // Set initial regex to binary (option 2)
    if (dropdownTrigger && regexContentDiv) {
        dropdownTrigger.textContent = 'Selected Regex: {1, 0}';
        regexContentDiv.textContent = regexPatterns['binary'];
        regexContentDiv.dataset.type = 'binary'; // Store the type in a data attribute
    }

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
            event.stopPropagation();
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
    if (option1 && option2 && dropdownTrigger && regexContentDiv) {
        option1.addEventListener('click', function () {
            console.log('Regex option selected: {a, b}');
            dropdownTrigger.textContent = 'Selected Regex: {a, b}';
            regexContentDiv.textContent = regexPatterns['alphabet'];
            regexContentDiv.dataset.type = 'alphabet';
            closeDropdown();
        });

        option2.addEventListener('click', function () {
            console.log('Regex option selected: {1, 0}');
            dropdownTrigger.textContent = 'Selected Regex: {1, 0}';
            regexContentDiv.textContent = regexPatterns['binary'];
            regexContentDiv.dataset.type = 'binary';
            closeDropdown();
        });
    }
});