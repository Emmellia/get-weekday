// Initialize the script once the window has loaded
window.onload = function() {
    // Populate the day dropdown with the default month and year
    populateDayDropdown();
    
    // Attach event listeners to repopulate the day dropdown
    // when the selected month or year changes
    document.getElementById("month").addEventListener('change', populateDayDropdown);
    document.getElementById("year").addEventListener('input', populateDayDropdown);
};

/**
 * Calculate the number of days in a given month for a given year.
 * 
 * @param {number} month - The zero-based month (0 = January, 11 = December).
 * @param {number} year - The year.
 * @returns {number} The number of days in the month.
 */
function getDaysInMonth(month, year) {
    // Using JavaScript's Date object, we set the day parameter to 0
    // which will give us the last day of the previous month.
    return new Date(year, month + 1, 0).getDate();
}

/**
 * Populate the day dropdown based on the selected month and year.
 */
function populateDayDropdown() {
    const month = parseInt(document.getElementById("month").value);
    const year = parseInt(document.getElementById("year").value);
    const dayDropdown = document.getElementById("day");

    // Clear existing options
    dayDropdown.innerHTML = '<option value="">Select a Day</option>';

    // Get the number of days for the selected month and year
    const daysInMonth = getDaysInMonth(month, year);
    
    // Fill the dropdown with the appropriate number of days
    for (let i = 1; i <= daysInMonth; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.innerText = i;
        dayDropdown.appendChild(option);
    }
}

/**
 * Handle form submission to predict the day of the week.
 * 
 * @param {Event} event - The form submission event.
 */
async function submitForm(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Gather form data
    const formData = new FormData(event.target);
    const data = {
        year: formData.get("year"),
        month: formData.get("month"),
        day: formData.get("day")
    };

    // Convert the form data into a Date object
    const date = new Date(data.year, data.month, data.day);
    // Get the month name
    const monthStr = date.toLocaleString('default', { month: 'long' });

    // Send the form data to the server for prediction
    const response = await fetch("/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    // Display the server's prediction
    const result = await response.json();
    const resultDiv = document.getElementById("result");
    resultDiv.classList.remove("hidden");

    // Wait for the next frame to be requested before adding the 'visible' class
    requestAnimationFrame(() => {
        resultDiv.classList.add("visible");
    });

    document.getElementById("prediction").innerText = `${monthStr} ${data.day}, ${data.year} is a ${result.predict}`;
    document.getElementById("fact").innerText = `Fact: ${result.fact}`;
}