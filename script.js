// Waitlist emails storage (in a real application, this would be sent to a backend)
let waitlistEmails = [];

// Open waitlist modal
function openWaitlistModal() {
    const modal = document.getElementById('waitlistModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
}

// Close waitlist modal
function closeWaitlistModal() {
    const modal = document.getElementById('waitlistModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling

    // Reset form
    const form = document.getElementById('waitlistForm');
    form.reset();

    // Hide success message
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.remove('show');
}

// Handle waitlist form submission
function handleWaitlistSubmit(event) {
    event.preventDefault();

    const emailInput = document.getElementById('emailInput');
    const email = emailInput.value.trim();

    if (email && isValidEmail(email)) {
        // Store email (in a real application, send this to your backend)
        waitlistEmails.push({
            email: email,
            timestamp: new Date().toISOString()
        });

        // Save to localStorage for demonstration purposes
        localStorage.setItem('waitlistEmails', JSON.stringify(waitlistEmails));

        // Log to console (in production, this would be sent to your server)
        console.log('New waitlist signup:', email);
        console.log('All waitlist emails:', waitlistEmails);

        // Show success message
        const successMessage = document.getElementById('successMessage');
        successMessage.classList.add('show');

        // Hide form
        const form = document.getElementById('waitlistForm');
        form.style.display = 'none';

        // Reset and show form again after 3 seconds, then close modal
        setTimeout(() => {
            form.reset();
            form.style.display = 'flex';
            successMessage.classList.remove('show');
            closeWaitlistModal();
        }, 3000);
    }
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('waitlistModal');
    if (event.target === modal) {
        closeWaitlistModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeWaitlistModal();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Load existing waitlist emails from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedEmails = localStorage.getItem('waitlistEmails');
    if (savedEmails) {
        waitlistEmails = JSON.parse(savedEmails);
        console.log('Loaded waitlist emails:', waitlistEmails);
    }
});

// Add click handler to product card as well
document.addEventListener('DOMContentLoaded', function() {
    const productCard = document.getElementById('cliniqbot-card');
    if (productCard) {
        productCard.addEventListener('click', function(e) {
            // Don't open modal if the button was clicked (it has its own handler)
            if (e.target.tagName !== 'BUTTON') {
                openWaitlistModal();
            }
        });
    }
});
