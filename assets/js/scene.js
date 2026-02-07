// Scene page dynamic rendering

// Get scene ID from URL parameter
function getSceneId() {
    const params = new URLSearchParams(location.search);
    const id = params.get("id");
    return id ? id.padStart(3, "0") : null;
}

// Convert level number to stars
function stars(level) {
    const starMap = {
        1: "★☆☆☆",
        2: "★★☆☆",
        3: "★★★☆",
        4: "★★★★"
    };
    return starMap[level] || "★☆☆☆";
}

// Copy text to clipboard (fallback for non-secure contexts or gesture loss)
function copyToClipboard(text) {
    if (!text) return Promise.reject();
    if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text).catch(() => copyFallback(text));
    }
    return copyFallback(text);
}

// Fallback copy using execCommand for environments where Clipboard API fails
function copyFallback(text) {
    return new Promise((resolve, reject) => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '-9999px';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try {
            const ok = document.execCommand('copy');
            document.body.removeChild(textarea);
            ok ? resolve() : reject(new Error('execCommand copy failed'));
        } catch (e) {
            document.body.removeChild(textarea);
            reject(e);
        }
    });
}

// Load prompt text from file synchronously (keeps user gesture context alive for clipboard)
function loadPromptTextSync(url) {
    try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, false); // synchronous
        xhr.send();
        if ((xhr.status === 200 || xhr.status === 0) && xhr.responseText) {
            return xhr.responseText;
        }
    } catch (e) {
        console.error('Failed to load prompt:', e);
    }
    return null;
}

// Add touch effect to step button
function addTouchEffect(button) {
    button.addEventListener('touchstart', () => {
        button.classList.add('touch-active');
    }, { passive: true });

    button.addEventListener('touchend', () => {
        setTimeout(() => {
            button.classList.remove('touch-active');
        }, 300);
    }, { passive: true });

    button.addEventListener('touchcancel', () => {
        button.classList.remove('touch-active');
    }, { passive: true });
}

// Render step buttons for 学習開始 tab
function renderLearningSteps(container, steps) {
    container.innerHTML = "";
    steps.forEach((step, idx) => {
        const button = document.createElement("button");
        button.className = "step-button";
        button.innerHTML = `
            <span class="step-text">
                <span class="step-number">${step.label || `STEP ${idx + 1}`} </span>
                <span class="step-label">を開始する</span>
            </span>
            <img src="../../assets/images/right-arrow.svg" alt="" class="step-arrow">
        `;

        button.addEventListener("click", () => {
            const sceneId = getSceneId();
            const stepNum = idx + 1;
            const promptUrl = `../../assets/prompts/SCENE${sceneId}-STEP${stepNum}.txt`;

            // Load synchronously to keep user gesture context for clipboard access
            const text = loadPromptTextSync(promptUrl);
            if (text) {
                copyToClipboard(text).catch(err => console.error('Copy failed:', err));
            }

            showChatGPTPopup();
        });

        addTouchEffect(button);
        container.appendChild(button);
    });
}

// Render step buttons for プロンプト tab
function renderPromptSteps(container, steps) {
    container.innerHTML = "";
    steps.forEach((step, idx) => {
        // Create wrapper for button and notification
        const wrapper = document.createElement("div");
        wrapper.className = "prompt-button-wrapper";

        const button = document.createElement("button");
        button.className = "step-button prompt-button";
        button.innerHTML = `
            <span class="step-text">
                <span class="step-number">${step.label || `STEP ${idx + 1}`} </span>
                <span class="step-label">プロンプトをコピー</span>
            </span>
            <div class="copy-icon-wrapper">
                <img src="../../assets/images/copy-icon.svg" alt="Copy" class="copy-icon">
            </div>
        `;

        // Create notification outside the button
        const notification = document.createElement("div");
        notification.className = "copied-notification";
        notification.innerHTML = `
            <div class="copied-main">
                <p class="copied-text">Copied!</p>
            </div>
            <div class="copied-arrow-wrapper">
                <img src="../../assets/images/copied-arrow.svg" alt="" class="copied-arrow">
            </div>
        `;

        button.addEventListener("click", () => {
            const textToCopy = step.text || `[${step.label || `STEP ${idx + 1}`}のプロンプトをここに入力してください]`;

            copyToClipboard(textToCopy)
                .then(() => {
                    // Show copied notification
                    notification.classList.remove('show', 'hide');
                    void notification.offsetWidth; // Trigger reflow
                    notification.classList.add('show');

                    setTimeout(() => {
                        notification.classList.remove('show');
                        notification.classList.add('hide');
                        setTimeout(() => {
                            notification.classList.remove('hide');
                        }, 300);
                    }, 2000);
                })
                .catch(err => console.error('Failed to copy:', err));
        });

        addTouchEffect(button);
        wrapper.appendChild(button);
        wrapper.appendChild(notification);
        container.appendChild(wrapper);
    });
}

// Render audio players for 見本音声 tab
function renderAudioSteps(container, sampleAudios) {
    container.innerHTML = "";

    if (!sampleAudios || sampleAudios.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #686868;">音声データがありません</p>';
        return;
    }

    sampleAudios.forEach((audio, idx) => {
        const audioCard = document.createElement("div");
        audioCard.className = "audio-card";
        audioCard.setAttribute("data-audio-step", idx + 1);
        audioCard.innerHTML = `
            <div class="audio-label">
                <span class="audio-step-number">${audio.title.replace('_', ' ')}</span>
            </div>
            <div class="audio-timeline-section">
                <span class="audio-time-start">0:00</span>
                <div class="audio-timeline-wrapper">
                    <div class="audio-timeline-track"></div>
                    <div class="audio-timeline-progress"></div>
                    <div class="audio-timeline-handle"></div>
                </div>
                <span class="audio-time-end">0:00</span>
            </div>
            <div class="audio-controls">
                <button class="audio-rewind-button" aria-label="Rewind 10 seconds">
                    <img src="../../assets/images/rewind-10.svg" alt="" class="audio-rewind-icon">
                </button>
                <button class="audio-play-button" aria-label="Play">
                    <img src="../../assets/images/play-large.svg" alt="" class="audio-play-icon">
                </button>
                <button class="audio-forward-button" aria-label="Forward 10 seconds">
                    <img src="../../assets/images/forward-10.svg" alt="" class="audio-forward-icon">
                </button>
            </div>
            <audio class="audio-element" preload="metadata">
                <source src="${audio.url}" type="audio/mpeg">
            </audio>
        `;

        container.appendChild(audioCard);
    });

    // Initialize audio players
    initializeAudioPlayers();
}

// Global flag to track if audio timeline is being dragged
let isAudioTimelineDragging = false;

// Initialize audio player functionality
function initializeAudioPlayers() {
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

        function formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${mins}:${secs.toString().padStart(2, '0')}`;
        }

        function updateTimeDisplay() {
            timeStart.textContent = formatTime(audio.currentTime);
            timeEnd.textContent = formatTime(audio.duration || 0);
        }

        function updateTimeline() {
            if (audio.duration) {
                const progress = (audio.currentTime / audio.duration) * 100;
                timelineProgress.style.width = `${progress}%`;
                timelineHandle.style.left = `${progress}%`;
            }
        }

        playButton.addEventListener('click', () => {
            if (audio.paused) {
                document.querySelectorAll('.audio-element').forEach(otherAudio => {
                    if (otherAudio !== audio && !otherAudio.paused) {
                        otherAudio.pause();
                    }
                });
                audio.play();
                playIcon.src = '../../assets/images/pause-large.svg';
            } else {
                audio.pause();
                playIcon.src = '../../assets/images/play-large.svg';
            }
        });

        rewindButton.addEventListener('click', () => {
            audio.currentTime = Math.max(0, audio.currentTime - 10);
        });

        forwardButton.addEventListener('click', () => {
            audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
        });

        // Click to seek
        timelineWrapper.addEventListener('click', (e) => {
            const rect = timelineWrapper.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = Math.max(0, Math.min(1, clickX / rect.width));
            audio.currentTime = percentage * audio.duration;
        });

        // Drag/swipe functionality for timeline handle
        let isDragging = false;

        function seekToPosition(clientX) {
            const rect = timelineWrapper.getBoundingClientRect();
            const offsetX = clientX - rect.left;
            const percentage = Math.max(0, Math.min(1, offsetX / rect.width));
            audio.currentTime = percentage * audio.duration;
        }

        // Mouse events
        timelineHandle.addEventListener('mousedown', (e) => {
            isDragging = true;
            isAudioTimelineDragging = true;
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                seekToPosition(e.clientX);
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            isAudioTimelineDragging = false;
        });

        // Touch events
        timelineHandle.addEventListener('touchstart', (e) => {
            isDragging = true;
            isAudioTimelineDragging = true;
            e.preventDefault();
            e.stopPropagation();
        }, { passive: false });

        timelineWrapper.addEventListener('touchstart', (e) => {
            isDragging = true;
            isAudioTimelineDragging = true;
            seekToPosition(e.touches[0].clientX);
            e.stopPropagation();
        }, { passive: false });

        document.addEventListener('touchmove', (e) => {
            if (isDragging) {
                seekToPosition(e.touches[0].clientX);
            }
        }, { passive: true });

        document.addEventListener('touchend', () => {
            isDragging = false;
            isAudioTimelineDragging = false;
        });

        audio.addEventListener('loadedmetadata', updateTimeDisplay);
        audio.addEventListener('timeupdate', () => {
            updateTimeDisplay();
            updateTimeline();
        });
        audio.addEventListener('ended', () => {
            playIcon.src = '../../assets/images/play-large.svg';
            audio.currentTime = 0;
            updateTimeline();
        });
        audio.addEventListener('pause', () => {
            playIcon.src = '../../assets/images/play-large.svg';
        });
        audio.addEventListener('play', () => {
            playIcon.src = '../../assets/images/pause-large.svg';
        });

        updateTimeDisplay();
    });
}

// Popup state
let popupPhaseTimeout = null;
let popupDotInterval = null;

// Show ChatGPT popup with 2-phase display
function showChatGPTPopup() {
    const overlay = document.getElementById('popupOverlay');
    const phase1 = document.getElementById('popupPhase1');
    const phase2 = document.getElementById('popupPhase2');
    const cancelBtn = document.getElementById('popupCancel');
    const dots = document.querySelectorAll('.popup-dot');
    const video = overlay.querySelector('.popup-screenshot-img');

    // Reset to phase 1
    phase1.classList.add('active');
    phase2.classList.remove('active');
    dots.forEach((dot) => dot.classList.remove('active'));

    // Show overlay
    overlay.classList.add('active');

    // Phase 1 → Phase 2 transition after 2 seconds
    popupPhaseTimeout = setTimeout(() => {
        phase1.classList.remove('active');
        phase2.classList.add('active');

        // Start video from beginning
        if (video && video.tagName === 'VIDEO') {
            video.currentTime = 0;
            video.play();
        }

        // Animate progress dots sequentially
        let dotIndex = 0;
        dots.forEach((dot) => dot.classList.add('active'));
        popupDotInterval = setInterval(() => {
            dots.forEach((dot) => dot.classList.remove('active'));
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i <= dotIndex);
            });
            dotIndex = (dotIndex + 1) % dots.length;
        }, 600);
    }, 2000);

    // Cancel/close handler
    function handleCancel() {
        if (popupPhaseTimeout) {
            clearTimeout(popupPhaseTimeout);
            popupPhaseTimeout = null;
        }
        if (popupDotInterval) {
            clearInterval(popupDotInterval);
            popupDotInterval = null;
        }
        overlay.classList.remove('active');
        cancelBtn.removeEventListener('click', handleCancel);
        overlay.removeEventListener('click', handleOverlayClick);
    }

    function handleOverlayClick(e) {
        if (e.target === overlay) {
            handleCancel();
        }
    }

    cancelBtn.addEventListener('click', handleCancel);
    overlay.addEventListener('click', handleOverlayClick);

    // Close popup when ChatGPT link is clicked
    const chatgptLink = document.getElementById('popupChatGPTLink');
    if (chatgptLink) {
        chatgptLink.addEventListener('click', () => {
            handleCancel();
        });
    }
}

// Main initialization
(function main() {
    document.addEventListener('DOMContentLoaded', () => {
        // Prevent flash of content before animation
        document.body.classList.add('loaded');

        const id = getSceneId();
        const scene = window.SCENES?.find(s => s.id === id);

        if (!scene) {
            document.body.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; gap: 20px; padding: 20px;">
                    <h1 style="font-size: 24px; color: #333;">シーンが見つかりません</h1>
                    <p style="color: #666;">ID: ${id || "(指定なし)"}</p>
                    <a href="../index.html" style="color: #7fff00; text-decoration: none; padding: 10px 20px; border: 2px solid black; border-radius: 8px;">Contentsへ戻る</a>
                </div>
            `;
            return;
        }

        // Update page title
        document.getElementById('pageTitle').textContent = `SCENE ${scene.id} - ChatGPT英会話`;

        // Update header info
        document.getElementById('categoryTag').textContent = scene.category;
        document.getElementById('levelTag').textContent = stars(scene.level);
        document.getElementById('sceneNumber').textContent = `SCENE ${scene.id}`;
        document.getElementById('sceneLocation').textContent = scene.place;
        document.getElementById('sceneTitle').textContent = scene.title;

        // Update scene image
        const sceneImage = document.getElementById('sceneImage');
        if (sceneImage && scene.image) {
            sceneImage.src = `../../assets/images/${scene.image}`;
        }

        // Render tabs content
        renderLearningSteps(document.getElementById('start-content'), scene.learningSteps || []);
        renderPromptSteps(document.getElementById('prompt-content'), scene.promptSteps || []);
        renderAudioSteps(document.getElementById('audio-content'), scene.sampleAudios);

        // Tab switching functionality (from scene001.js)
        const tabs = document.querySelectorAll('.tab');
        const tabContents = document.querySelectorAll('.tab-content');

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
        const tabContentWrapper = document.querySelector('.tab-content-wrapper');
        let touchStartX = 0;
        let touchEndX = 0;
        let tabSwipeBlocked = false;
        const minSwipeDistance = 50;
        const tabOrder = ['start', 'prompt', 'audio'];

        tabContentWrapper.addEventListener('touchstart', (e) => {
            // Block tab swipe if starting on audio timeline
            const target = e.target;
            if (target.closest('.audio-timeline-wrapper') || target.closest('.audio-timeline-handle')) {
                tabSwipeBlocked = true;
                return;
            }
            tabSwipeBlocked = false;
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        tabContentWrapper.addEventListener('touchend', (e) => {
            if (tabSwipeBlocked || isAudioTimelineDragging) {
                tabSwipeBlocked = false;
                return;
            }
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            // Skip if audio timeline is being dragged
            if (isAudioTimelineDragging) {
                return;
            }

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
        backButton.addEventListener('click', () => {
            window.location.href = '../index.html';
        });

        // Trigger animations
        setTimeout(() => {
            const stepButtons = document.querySelectorAll('.step-button');
            const audioCards = document.querySelectorAll('.audio-card');

            stepButtons.forEach(button => button.classList.add('animate-in'));
            audioCards.forEach(card => card.classList.add('animate-in'));
        }, 100);
    });
})();
