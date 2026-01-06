// Guides page interactions and animations

document.addEventListener('DOMContentLoaded', () => {
    // Prevent flash of content before animation
    document.body.classList.add('loaded');

    // Trigger card animations
    function triggerCardAnimations() {
        const guideCards = document.querySelectorAll('.guide-card');
        guideCards.forEach(card => {
            card.classList.add('animate-in');
        });
    }

    // Trigger animations on page load
    setTimeout(triggerCardAnimations, 100);

    // Guide card click effects
    const guideCards = document.querySelectorAll('.guide-card');

    guideCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Create light ripple effect (like contents page)
            const light = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const size = Math.max(rect.width, rect.height);

            light.style.position = 'absolute';
            light.style.left = x + 'px';
            light.style.top = y + 'px';
            light.style.width = size + 'px';
            light.style.height = size + 'px';
            light.style.borderRadius = '50%';
            light.style.backgroundColor = 'rgba(127, 255, 0, 0.4)';
            light.style.pointerEvents = 'none';
            light.style.transform = 'translate(-50%, -50%) scale(0)';
            light.style.animation = 'light-ripple 0.6s ease-out';

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(light);

            setTimeout(() => light.remove(), 600);
        });
    });

    // Menu overlay functionality
    const menuButton = document.querySelector('.menu-button');
    const menuOverlay = document.querySelector('.menu-overlay');
    const closeButton = document.querySelector('.close-button');

    // Open menu
    menuButton.addEventListener('click', () => {
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close menu
    closeButton.addEventListener('click', () => {
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close menu when clicking outside menu content
    menuOverlay.addEventListener('click', (e) => {
        if (e.target === menuOverlay) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close menu with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes light-ripple {
        from {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        to {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
