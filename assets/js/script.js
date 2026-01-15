// Interactive animations and effects

document.addEventListener('DOMContentLoaded', () => {
    // Prevent flash of content before animation
    document.body.classList.add('loaded');

    // Add parallax effect to background
    const home = document.querySelector('.home');

    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

        home.style.backgroundPosition = `${moveX}px ${moveY}px`;
    });

    // Illustration animation only on page load (handled by CSS)

    // Add interactive title effects
    const titleLines = document.querySelectorAll('.main-title p');

    titleLines.forEach((line, index) => {
        line.addEventListener('mouseenter', () => {
            line.style.transform = 'scale(1.05)';
            line.style.transition = 'transform 0.3s ease';
        });

        line.addEventListener('mouseleave', () => {
            line.style.transform = 'scale(1)';
        });
    });

    // Add ripple effect on button click
    const button = document.querySelector('.start-button');

    button.addEventListener('click', function(e) {
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

        this.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            ripple.remove();
        }, 600);

        // Add scale animation to button
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);

        // Navigate to contents page
        setTimeout(() => {
            window.location.href = 'contents/index.html';
        }, 400);
    });

    // Removed pulsing effect to prevent button from disappearing

    // Add scroll reveal effect (if page becomes longer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const observeElements = document.querySelectorAll('.image-container, .title-section');
    observeElements.forEach(el => observer.observe(el));

    // Add particle effect on hover over title
    const titleSection = document.querySelector('.title-section');

    titleSection.addEventListener('mouseenter', () => {
        createParticles();
    });

    function createParticles() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.classList.add('particle');

                const rect = titleSection.getBoundingClientRect();
                const x = Math.random() * rect.width;
                const y = Math.random() * rect.height;

                particle.style.position = 'absolute';
                particle.style.left = x + 'px';
                particle.style.top = y + 'px';
                particle.style.width = '4px';
                particle.style.height = '4px';
                particle.style.backgroundColor = '#7fff00';
                particle.style.borderRadius = '50%';
                particle.style.pointerEvents = 'none';
                particle.style.animation = 'particle-float 1.5s ease-out forwards';
                particle.style.zIndex = '1000';

                titleSection.style.position = 'relative';
                titleSection.appendChild(particle);

                setTimeout(() => {
                    particle.remove();
                }, 1500);
            }, i * 100);
        }
    }
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

    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.02);
        }
    }

    @keyframes particle-float {
        from {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        to {
            transform: translateY(-50px) scale(0);
            opacity: 0;
        }
    }

    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);
