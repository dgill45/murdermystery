// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get the form element
    const form = document.getElementById("signupForm");

    // Add an event listener for the form submission
    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        // Get form data
        const name = document.getElementById("name").value.trim();
        const address = document.getElementById("address").value.trim();
        const attending = document.querySelector('input[name="attending"]:checked');
        const character = document.querySelector('input[name="character"]:checked');

        // Validate form inputs
        if (!name || !address || !attending || !character) {
            alert("Please fill out all fields.");
            return;
        }

        // Prepare the data object
        const formData = {
            name: name,
            address: address,
            attending: attending.value,
            character: character.value
        };

        // For now, just log the data to the console
        console.log("Form Submitted:", formData);

        // Show a confirmation message or redirect the user
        alert("Thank you for your submission!");

        // Clear the form (optional)
        form.reset();
    });
});
