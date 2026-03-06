// Guide01 page interactions and animations

document.addEventListener('DOMContentLoaded', () => {
    // Prevent flash of content before animation
    document.body.classList.add('loaded');

    // Back button functionality
    const backButton = document.querySelector('.back-button');

    if (backButton) {
        backButton.addEventListener('click', function() {
            console.log('Back button clicked');

            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Navigate back to guides page
            window.location.href = '../index.html';
        });
    }

    // Lightbox for article images
    const articleImages = document.querySelectorAll('.paragraph-text img:not(.store-badge)');

    if (articleImages.length > 0) {
        const lightbox = document.createElement('div');
        lightbox.className = 'guide-popup-overlay';
        lightbox.setAttribute('aria-hidden', 'true');
        lightbox.innerHTML = `
            <div class="guide-popup-container">
                <div class="guide-popup-card" role="dialog" aria-modal="true" aria-label="画像の拡大表示">
                    <img class="guide-popup-image" alt="">
                </div>
                <button class="guide-popup-close-button" type="button" aria-label="閉じる">
                    <svg width="16" height="16" viewBox="0 0 21 21" fill="none" aria-hidden="true">
                        <path d="M15.625 5.25L5.25 15.625" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M5.25 5.25L15.625 15.625" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="guide-popup-close-text">閉じる</span>
                </button>
            </div>
        `;
        document.body.appendChild(lightbox);

        const lightboxImage = lightbox.querySelector('.guide-popup-image');
        const closeButton = lightbox.querySelector('.guide-popup-close-button');
        const popupContainer = lightbox.querySelector('.guide-popup-container');

        function closeLightbox() {
            lightbox.classList.remove('active');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            lightboxImage.removeAttribute('src');
            lightboxImage.alt = '';
        }

        function openLightbox(image) {
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt || '';
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }

        articleImages.forEach(image => {
            image.classList.add('is-zoomable');
            image.setAttribute('tabindex', '0');
            image.setAttribute('role', 'button');
            image.setAttribute('aria-label', `${image.alt || '画像'}を拡大表示`);

            image.addEventListener('click', () => {
                openLightbox(image);
            });

            image.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openLightbox(image);
                }
            });
        });

        lightbox.addEventListener('click', (event) => {
            if (!popupContainer.contains(event.target)) {
                closeLightbox();
            }
        });

        closeButton.addEventListener('click', closeLightbox);

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }
});
