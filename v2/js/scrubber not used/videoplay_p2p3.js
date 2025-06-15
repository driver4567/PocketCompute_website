// Global variables
const video = document.getElementById('video_scrub');
const container = document.querySelector('.hero-image-container');

let videoDuration = 0;
let videoFPS = 0;
let totalFrames = 0;

let targetTime = 0;
let currentDisplayTime = 0;
let isAnimating = false;

// Scroll state
let scrollTimeout;
let isScrolling = false;
let lastScrollY = window.scrollY;
let lastScrollTime = performance.now();
let lastSeekTime = 0;

// Smooth seeking parameters
const SEEK_SMOOTHING = 0.1; // Increased for MP4
const MIN_TIME_DIFF = 0.016;
const SCROLL_DEBOUNCE_MS = 200;
const FAST_SEEK_THRESHOLD = 1.0;

// --- Initialization ---
video.addEventListener('loadedmetadata', () => {
    videoDuration = video.duration;

    // FPS detection
    videoFPS = (video.videoTracks && video.videoTracks.length > 0 && video.videoTracks[0].frameRate) || 30;
    video.play().then(() => {
        video.pause();
        if (video.seekable.length > 0) {
            const frameCount = Math.round(videoDuration * videoFPS);
            console.log(`Detected FPS: ${videoFPS}, Frames: ${frameCount}`);
        }
    }).catch(err => console.warn('FPS verification failed:', err));

    totalFrames = Math.round(videoDuration * videoFPS);
    console.log(`Video FPS: ${videoFPS}, Total Frames: ${totalFrames}, Duration: ${videoDuration}s`);

    // Style video
    const aspectRatio = video.videoWidth / video.videoHeight;
    let videoWidth = container.offsetWidth;
    let videoHeight = videoWidth / aspectRatio;
    const maxViewportHeight = window.innerHeight * 0.8;
    if (videoHeight > maxViewportHeight) {
        videoHeight = maxViewportHeight;
        videoWidth = videoHeight * aspectRatio;
    }
    video.style.width = `${videoWidth}px`;
    video.style.height = `${videoHeight}px`;

    // Set body height
    const scrollHeightPerFrame = 10;
    const minScrollHeight = window.innerHeight * 3;
    const calculatedHeight = totalFrames * scrollHeightPerFrame;
    document.body.style.height = `${Math.max(minScrollHeight, calculatedHeight)}px`;

    // Initialize
    targetTime = 0;
    currentDisplayTime = 0;
    video.currentTime = 0;
    video.muted = true;

    startSmoothSeekLoop();
    container.style.opacity = '1';
});

// Smooth seeking loop
function startSmoothSeekLoop() {
    function smoothSeek() {
        if (isAnimating) {
            const timeDiff = targetTime - currentDisplayTime;
            const absTimeDiff = Math.abs(timeDiff);

            if (absTimeDiff > MIN_TIME_DIFF) {
                let smoothing = SEEK_SMOOTHING;
                if (isScrolling) {
                    smoothing = Math.min(0.15, SEEK_SMOOTHING * 2);
                }
                if (absTimeDiff > FAST_SEEK_THRESHOLD) {
                    smoothing = Math.min(0.3, smoothing * (absTimeDiff / FAST_SEEK_THRESHOLD));
                }

                currentDisplayTime += timeDiff * smoothing;
                currentDisplayTime = Math.max(0, Math.min(currentDisplayTime, videoDuration));

                // Throttle seeks to 30 Hz
                const now = performance.now();
                if (now - lastSeekTime > 33) {
                    video.currentTime = currentDisplayTime;
                    lastSeekTime = now;
                    // Play if scrolling, pause if close to target
                    if (isScrolling && absTimeDiff > 0.1) {
                        video.play().catch(() => {});
                    } else {
                        video.pause();
                    }
                }
            } else {
                currentDisplayTime = targetTime;
                if (now - lastSeekTime > 33) {
                    video.currentTime = targetTime;
                    lastSeekTime = now;
                    video.pause();
                }
                if (!isScrolling) {
                    isAnimating = false;
                }
            }
        }
        requestAnimationFrame(smoothSeek);
    }
    requestAnimationFrame(smoothSeek);
}

// Scroll handler
let scrollRaf;
window.addEventListener('scroll', () => {
    if (scrollRaf) return;

    scrollRaf = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = document.body.offsetHeight - window.innerHeight;

        // Scroll velocity
        const now = performance.now();
        const timeDelta = (now - lastScrollTime) / 1000;
        const scrollDelta = Math.abs(scrollY - lastScrollY);
        const scrollVelocity = timeDelta > 0 ? scrollDelta / timeDelta : 0;

        const dynamicDebounce = Math.max(100, Math.min(200, 200 - scrollVelocity / 50));

        const rawScrollFraction = Math.max(0, Math.min(scrollY / maxScroll, 1));
        const easedScrollFraction = applyScrollEasing(rawScrollFraction);
        const newTargetTime = easedScrollFraction * videoDuration;

        const timeDiff = Math.abs(newTargetTime - targetTime);

        if (timeDiff > MIN_TIME_DIFF) {
            targetTime = newTargetTime;
            isScrolling = true;
            isAnimating = true;
        }

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, dynamicDebounce);

        lastScrollY = scrollY;
        lastScrollTime = now;
        scrollRaf = null;
    });
});

// Resize handler
let resizeRaf;
window.addEventListener('resize', () => {
    if (resizeRaf) cancelAnimationFrame(resizeRaf);

    resizeRaf = requestAnimationFrame(() => {
        const aspectRatio = video.videoWidth / video.videoHeight;
        let videoWidth = container.offsetWidth;
        let videoHeight = videoWidth / aspectRatio;
        const maxViewportHeight = window.innerHeight * 0.8;
        if (videoHeight > maxViewportHeight) {
            videoHeight = maxViewportHeight;
            videoWidth = videoHeight * aspectRatio;
        }
        video.style.width = `${videoWidth}px`;
        video.style.height = `${videoHeight}px`;

        const scrollHeightPerFrame = 10;
        const minScrollHeight = window.innerHeight * 3;
        const calculatedHeight = totalFrames * scrollHeightPerFrame;
        document.body.style.height = `${Math.max(minScrollHeight, calculatedHeight)}px`;

        resizeRaf = null;
    });
});

// Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            video.pause();
            isAnimating = false;
        } else if (Math.abs(targetTime - currentDisplayTime) > MIN_TIME_DIFF) {
            isAnimating = true;
        }
    });
}, { threshold: 0.1, rootMargin: '50px' });

observer.observe(container);

// Video setup
video.preload = 'auto';
video.muted = true;
video.loop = false;

// Visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        video.pause();
    } else if (Math.abs(targetTime - currentDisplayTime) > MIN_TIME_DIFF) {
        isAnimating = true;
    }
});

// Easing function
function applyScrollEasing(fraction) {
    return 1 - Math.pow(1 - fraction, 3);
}

console.log('Smooth video playback initialized - no reverse playback required!');