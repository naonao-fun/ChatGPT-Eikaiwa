// Guide01 page interactions and animations

document.addEventListener('DOMContentLoaded', () => {
    // Prevent flash of content before animation
    document.body.classList.add('loaded');

    // Back button functionality
    const backButton = document.querySelector('.back-button');

    backButton.addEventListener('click', function() {
        console.log('Back button clicked');

        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);

        // Navigate back to guides page
        window.location.href = 'guides.html';
    });
});
