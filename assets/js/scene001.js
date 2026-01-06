// Scene001 page interactions and animations

document.addEventListener('DOMContentLoaded', () => {
    // Prevent flash of content before animation
    document.body.classList.add('loaded');

    // Trigger animations for step buttons and audio cards
    function triggerAnimations() {
        const stepButtons = document.querySelectorAll('.step-button');
        const audioCards = document.querySelectorAll('.audio-card');

        stepButtons.forEach(button => {
            button.classList.add('animate-in');
        });

        audioCards.forEach(card => {
            card.classList.add('animate-in');
        });
    }

    // Trigger animations on page load
    setTimeout(triggerAnimations, 100);

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

            // Re-trigger animations for the new tab content
            setTimeout(() => {
                const buttons = targetContent.querySelectorAll('.step-button');
                const cards = targetContent.querySelectorAll('.audio-card');

                buttons.forEach(button => {
                    button.classList.remove('animate-in', 'quick');
                    void button.offsetWidth; // Trigger reflow
                    button.classList.add('animate-in', 'quick');
                });

                cards.forEach(card => {
                    card.classList.remove('animate-in', 'quick');
                    void card.offsetWidth; // Trigger reflow
                    card.classList.add('animate-in', 'quick');
                });
            }, 50);
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

    // Audio player functionality
    const audioCards = document.querySelectorAll('.audio-card');

    audioCards.forEach(card => {
        const audio = card.querySelector('.audio-element');
        const playButton = card.querySelector('.audio-play-button');
        const playIcon = card.querySelector('.audio-play-icon');
        const rewindButton = card.querySelector('.audio-rewind-button');
        const forwardButton = card.querySelector('.audio-forward-button');
        const timeStart = card.querySelector('.audio-time-start');
        const timeEnd = card.querySelector('.audio-time-end');
        const timelineWrapper = card.querySelector('.audio-timeline-wrapper');
        const timelineProgress = card.querySelector('.audio-timeline-progress');
        const timelineHandle = card.querySelector('.audio-timeline-handle');

        // Format time helper
        function formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        }

        // Update time display
        function updateTimeDisplay() {
            timeStart.textContent = formatTime(audio.currentTime);
            timeEnd.textContent = formatTime(audio.duration || 0);
        }

        // Update timeline
        function updateTimeline() {
            if (audio.duration) {
                const progress = (audio.currentTime / audio.duration) * 100;
                timelineProgress.style.width = `${progress}%`;
                timelineHandle.style.left = `${progress}%`;
            }
        }

        // Play/Pause toggle
        playButton.addEventListener('click', () => {
            if (audio.paused) {
                // Pause all other audio players
                document.querySelectorAll('.audio-element').forEach(otherAudio => {
                    if (otherAudio !== audio && !otherAudio.paused) {
                        otherAudio.pause();
                    }
                });

                audio.play();
                playIcon.src = 'assets/images/pause-large.svg';
            } else {
                audio.pause();
                playIcon.src = 'assets/images/play-large.svg';
            }
        });

        // Rewind 10 seconds
        rewindButton.addEventListener('click', () => {
            audio.currentTime = Math.max(0, audio.currentTime - 10);
        });

        // Forward 10 seconds
        forwardButton.addEventListener('click', () => {
            audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
        });

        // Timeline seek
        timelineWrapper.addEventListener('click', (e) => {
            const rect = timelineWrapper.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = clickX / rect.width;
            audio.currentTime = percentage * audio.duration;
        });

        // Audio event listeners
        audio.addEventListener('loadedmetadata', () => {
            updateTimeDisplay();
        });

        audio.addEventListener('timeupdate', () => {
            updateTimeDisplay();
            updateTimeline();
        });

        audio.addEventListener('ended', () => {
            playIcon.src = 'assets/images/play-large.svg';
            audio.currentTime = 0;
            updateTimeline();
        });

        audio.addEventListener('pause', () => {
            playIcon.src = 'assets/images/play-large.svg';
        });

        audio.addEventListener('play', () => {
            playIcon.src = 'assets/images/pause-large.svg';
        });

        // Initialize time display
        updateTimeDisplay();
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
                // Navigate to ChatGPT in new tab
                window.open('https://chatgpt.com/', '_blank');
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
