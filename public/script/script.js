const modals = document.querySelectorAll('.modal');
const overlay = document.getElementById('overlay');
const loginDiv = document.getElementById('login');

document.addEventListener('DOMContentLoaded', function () {

    let currentModalIndex = 0;
    let cyclingActive = true; // Flag to control cycling

    // Function to hide all modals and show login
    function showModalLogin() {
        cyclingActive = false; // Stop cycling modals

        // Hide all modals
        modals.forEach(modal => {
            modal.classList.add('hidden');
        });

        // Hide overlay
        overlay.classList.add('hidden');

        // Show login div
        loginDiv.classList.remove('hidden');
    }

    // Add click event listener to each modal
    modals.forEach(modal => {
        modal.addEventListener('click', showModalLogin);
    });

    // Function to cycle through modals
    function cycleModals() {
        if (!cyclingActive) return; // Exit if cycling is not active

        // Hide current modal
        modals[currentModalIndex].classList.add('hidden');

        // Calculate index of next modal to show
        currentModalIndex = (currentModalIndex + 1) % modals.length;

        // Show next modal
        modals[currentModalIndex].classList.remove('hidden');
    }

    // Start cycling modals every 4 seconds
    setInterval(cycleModals, 4000);

    // Initially, hide all modals except the first one
    modals.forEach((modal, index) => {
        if (index !== 0) modal.classList.add('hidden');
    });
    modals[0].classList.remove('hidden'); // Ensure the first modal is visible
    overlay.classList.remove('hidden'); // Show overlay when modals start cycling
});
