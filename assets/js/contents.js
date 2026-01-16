// Interactive animations and effects for contents page

// Helper function to convert level number to stars
function levelToStars(level) {
    const starMap = {
        1: "★☆☆☆",
        2: "★★☆☆",
        3: "★★★☆",
        4: "★★★★"
    };
    return starMap[level] || "★☆☆☆";
}

// Use scene data from scenes-data.js and convert to format needed for contents page
const scenesData = window.SCENES?.map(scene => ({
    id: scene.id,
    category: scene.category,
    level: levelToStars(scene.level),
    location: scene.place,
    title: scene.title,
    image: scene.image
})) || [];

document.addEventListener('DOMContentLoaded', () => {
    // Prevent flash of content before animation
    document.body.classList.add('loaded');

    // Generate scene cards dynamically
    const contentsList = document.getElementById('contentsList');
    scenesData.forEach((scene) => {
        const card = document.createElement('div');
        card.className = 'scene-card';
        card.setAttribute('data-name', `SCENE ${scene.id}`);

        card.innerHTML = `
            <div class="scene-image" data-name="image">
                <img src="../assets/images/${scene.image}" alt="SCENE ${scene.id}">
            </div>
            <div class="scene-data" data-name="SCENE Data">
                <div class="metadata" data-name="metadata">
                    <span class="category-tag" data-name="Category">${scene.category}</span>
                    <span class="level-tag" data-name="Level">${scene.level}</span>
                </div>
                <div class="scene-number">SCENE ${scene.id}</div>
                <div class="scene-location">${scene.location}</div>
                <div class="scene-title">${scene.title}</div>
            </div>
        `;

        contentsList.appendChild(card);
    });

    // Filter button functionality
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Toggle active state
            this.classList.toggle('active');

            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Here you can add filtering logic
            filterScenes();
        });
    });

    // Filter scenes based on active filters
    function filterScenes() {
        const sceneCards = document.querySelectorAll('.scene-card');

        // Get active category filters (ジャンル)
        const activeCategories = Array.from(document.querySelectorAll('.filter-btn.active'))
            .map(btn => btn.textContent.trim())
            .filter(text => !text.includes('★')); // Exclude star ratings

        // Get active level filters (レベル)
        const activeLevels = Array.from(document.querySelectorAll('.filter-btn.active'))
            .map(btn => btn.textContent.trim())
            .filter(text => text.includes('★')); // Only star ratings

        sceneCards.forEach(card => {
            const categoryTag = card.querySelector('.category-tag')?.textContent.trim();
            const levelTag = card.querySelector('.level-tag')?.textContent.trim();

            // Check if card matches filters (AND condition)
            let showCard = true;

            // If category filters are active, card must match one of them
            if (activeCategories.length > 0) {
                showCard = activeCategories.includes(categoryTag);
            }

            // If level filters are active, card must match one of them (AND with category)
            if (activeLevels.length > 0 && showCard) {
                showCard = activeLevels.includes(levelTag);
            }

            card.style.display = showCard ? 'flex' : 'none';
        });
    }

    // Scene card interactions
    const sceneCards = document.querySelectorAll('.scene-card');

    sceneCards.forEach(card => {
        // Add hover animation enhancement
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });

        // Add click handler
        card.addEventListener('click', function(e) {
            const sceneNumber = this.querySelector('.scene-number')?.textContent;
            const sceneId = sceneNumber?.replace('SCENE ', '');
            console.log(`Clicked on ${sceneNumber}`);

            // Add energetic click animation with bounce
            this.style.transition = 'all 0.15s cubic-bezier(0.4, 0, 0.6, 1)';
            this.style.transform = 'scale(0.95)';
            this.style.boxShadow = '1px 1px 0px 0px black';

            // Create light ripple effect (like home button)
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

            // Bounce back with overshoot
            setTimeout(() => {
                this.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
                this.style.transform = 'scale(1.02)';
                this.style.boxShadow = '4px 4px 0px 0px black';
            }, 150);

            // Settle to normal and navigate
            setTimeout(() => {
                this.style.transition = 'all 0.3s ease';
                this.style.transform = '';
                this.style.boxShadow = '';
                this.style.overflow = 'visible';

                // Navigate to scene page with ID parameter
                if (sceneId) {
                    window.location.href = `scene/index.html?id=${sceneId}`;
                }
            }, 400);
        });
    });

    // Menu overlay functionality
    const menuButton = document.querySelector('.menu-button');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeButton = document.getElementById('closeButton');

    // Open menu overlay
    menuButton.addEventListener('click', function() {
        console.log('Menu button clicked');

        // Add rotation animation
        this.style.transform = 'rotate(90deg) scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);

        // Show menu overlay
        menuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    // Close menu overlay
    closeButton.addEventListener('click', function() {
        console.log('Close button clicked');

        // Hide menu overlay
        menuOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    });

    // Close overlay when clicking outside the menu content
    menuOverlay.addEventListener('click', function(e) {
        if (e.target === menuOverlay) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close overlay with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Trigger animation for all cards on page load
    sceneCards.forEach((card, index) => {
        card.classList.add('animate-in');
    });

    // Add subtle parallax effect on scroll
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const header = document.querySelector('.header');

                if (header) {
                    header.style.transform = `translateY(${scrolled * 0.1}px)`;
                }

                ticking = false;
            });

            ticking = true;
        }
    });

    // TOP button functionality
    const topButton = document.getElementById('topButton');

    // Show/hide TOP button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            topButton.classList.add('visible');
        } else {
            topButton.classList.remove('visible');
        }
    });

    // Scroll to top when clicked
    topButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Add click animation
        topButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            topButton.style.transform = '';
        }, 150);
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

    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);
