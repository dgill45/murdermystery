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

        // POST the form data to the server
        fetch('http://localhost:3000/api/rsvp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.text())
        .then(data => {
            // Show a confirmation message
            alert("Thank you for your submission!");

            // Fetch and display the updated list of RSVPs
            fetchRSVPList();

            // Clear the form (optional)
            form.reset();
        })
        .catch(error => console.error('Error submitting RSVP:', error));
    });

    // Fetch and display the list of RSVPs when the page loads
    fetchRSVPList();

    function fetchRSVPList() {
        fetch('http://localhost:3000/api/rsvps')
        .then(response => response.json())
        .then(data => {
            const rsvpList = document.getElementById('rsvp-list');
            rsvpList.innerHTML = ''; // Clear existing list

            data.forEach(rsvp => {
                const listItem = document.createElement('li');
                listItem.textContent = `${rsvp.name} (${rsvp.attending}) - Character: ${rsvp.character}`;
                rsvpList.appendChild(listItem);
            });
        })
        .catch(error => console.error('Error fetching RSVP list:', error));
    }
});
