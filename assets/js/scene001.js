// Scene001 page interactions and animations

document.addEventListener('DOMContentLoaded', () => {
    // Prevent flash of content before animation
    document.body.classList.add('loaded');

    // Tab switching functionality
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    const tabContentWrapper = document.querySelector('.tab-content-wrapper');

    function switchTab(targetTab) {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));

        // Add active class to target tab
        const targetTabElement = document.querySelector(`[data-tab="${targetTab}"]`);
        if (targetTabElement) {
            targetTabElement.classList.add('active');
        }

        // Hide all tab contents
        tabContents.forEach(content => {
            content.classList.remove('active');
        });

        // Show target tab content
        const targetContent = document.getElementById(`${targetTab}-content`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            switchTab(targetTab);

            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Swipe functionality for tab content
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    const tabOrder = ['start', 'prompt', 'audio'];

    tabContentWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    tabContentWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) < minSwipeDistance) {
            return;
        }

        // Get current active tab
        const activeTab = document.querySelector('.tab.active');
        if (!activeTab) return;

        const currentTab = activeTab.getAttribute('data-tab');
        const currentIndex = tabOrder.indexOf(currentTab);

        let nextIndex;
        if (swipeDistance > 0) {
            // Swipe right - go to previous tab
            nextIndex = currentIndex - 1;
        } else {
            // Swipe left - go to next tab
            nextIndex = currentIndex + 1;
        }

        // Check if next index is valid
        if (nextIndex >= 0 && nextIndex < tabOrder.length) {
            switchTab(tabOrder[nextIndex]);
        }
    }

    // Back button functionality
    const backButton = document.querySelector('.back-button');

    backButton.addEventListener('click', function() {
        console.log('Back button clicked');

        // Add click animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);

        // Navigate back to contents page
        window.location.href = 'contents.html';
    });

    // Step button interactions
    const stepButtons = document.querySelectorAll('.step-button');

    stepButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            const isPromptButton = this.classList.contains('prompt-button');
            const stepNumber = isPromptButton
                ? Array.from(document.querySelectorAll('.prompt-button')).indexOf(this) + 1
                : Array.from(document.querySelectorAll('.step-button:not(.prompt-button)')).indexOf(this) + 1;

            console.log(`STEP ${stepNumber} clicked (${isPromptButton ? 'Prompt' : 'Start'})`);

            // Create ripple container to clip overflow
            let rippleContainer = this.querySelector('.ripple-container');
            if (!rippleContainer) {
                rippleContainer = document.createElement('div');
                rippleContainer.classList.add('ripple-container');
                rippleContainer.style.position = 'absolute';
                rippleContainer.style.inset = '0';
                rippleContainer.style.borderRadius = '7px';
                rippleContainer.style.overflow = 'hidden';
                rippleContainer.style.pointerEvents = 'none';
                rippleContainer.style.zIndex = '0';
                this.appendChild(rippleContainer);
            }

            // Create ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            // Get button dimensions and click position
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            // Style the ripple
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
            ripple.style.pointerEvents = 'none';
            ripple.style.animation = 'ripple-effect 0.6s ease-out';

            rippleContainer.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);

            // Add scale animation to button
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);

            // Handle prompt copy functionality
            if (isPromptButton) {
                // TODO: Add actual prompt text to copy
                const promptText = `STEP ${stepNumber} のプロンプト`;
                navigator.clipboard.writeText(promptText).then(() => {
                    console.log('Prompt copied to clipboard');

                    // Show copied notification
                    const notification = this.querySelector('.copied-notification');
                    if (notification) {
                        // Remove any existing animation classes
                        notification.classList.remove('show', 'hide');

                        // Trigger reflow to restart animation
                        void notification.offsetWidth;

                        // Show notification
                        notification.classList.add('show');

                        // Hide after 2 seconds
                        setTimeout(() => {
                            notification.classList.remove('show');
                            notification.classList.add('hide');

                            // Remove hide class after animation completes
                            setTimeout(() => {
                                notification.classList.remove('hide');
                            }, 300);
                        }, 2000);
                    }
                }).catch(err => {
                    console.error('Failed to copy prompt:', err);
                });
            } else {
                // Example navigation for start buttons - replace with actual functionality
                // window.location.href = `step${stepNumber}.html`;
            }
        });
    });
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-effect {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
