// Get DOM elements
const video = document.getElementById('video');
const canvas = document.getElementById('video_canvas');
const ctx = canvas.getContext('2d');

// Video control variables
let videoDuration = 0; // Will be set after video loads
let currentTime = 0; // Current video playback time
let isScrolling = false; // Flag for active scrolling
let lastScrollDirection = 1; // 1 for down (forward), -1 for up (backward)
let recoilStartTime = null; // Timestamp when recoil starts
let recoilDuration = 0; // 15% of video duration
let recoilVelocity = 0; // Speed of recoil based on last scroll
let lastScrollY = window.scrollY; // Track last scroll position
let lastScrollTime = performance.now(); // Track time of last scroll

// Wait for video metadata to load
video.addEventListener('loadedmetadata', () => {
    // Set video duration and recoil duration (15% of total)
    videoDuration = video.duration;
    //console.log(videoDuration);
    recoilDuration = videoDuration * 0.15; // e.g., 1.5s for a 10s video

    // Set canvas size based on video dimensions, scaled to column width
    const aspectRatio = video.videoWidth / video.videoHeight;
    const container = document.querySelector('.hero-image-container');
    let canvasWidth = container.offsetWidth; // Column width
    let canvasHeight = canvasWidth / aspectRatio;
    // Limit to viewport height if too tall
    if (canvasHeight > window.innerHeight /** 0.8*/) {
        canvasHeight = window.innerHeight /** 0.8*/;
        canvasWidth = canvasHeight * aspectRatio;
    }
    canvas.width = video.videoWidth; // Native resolution for rendering
    canvas.height = video.videoHeight;
    canvas.style.width = `${canvasWidth}px`; // Display size
    canvas.style.height = `${canvasHeight}px`;

    // Show canvas now that video is ready
    canvas.style.display = 'block';

    // Set body height (100px per second of video, min 200vh)
    const scrollHeight = Math.max(videoDuration * 100, window.innerHeight * 2);
    document.body.style.height = `${scrollHeight}px`;

    // Handle opacity animation
    container.style.opacity = '1'; // Remove opacity-0

    // Start rendering loop
    render();
});

// Handle scroll events for scrubbing
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    isScrolling = true;

    // Determine scroll direction
    lastScrollDirection = scrollY > lastScrollY ? 1 : -1;

    // Calculate scroll speed (pixels per second)
    const now = performance.now();
    const timeDelta = (now - lastScrollTime) / 1000; // Seconds
    const scrollDelta = Math.abs(scrollY - lastScrollY);
    const scrollSpeed = timeDelta > 0 ? scrollDelta / timeDelta : 0;

    // Map scrollY to video time (0 to maxScroll maps to 0 to videoDuration)
    const maxScroll = document.body.offsetHeight - window.innerHeight;
    const scrollFraction = Math.max(0, Math.min(scrollY / maxScroll, 1));
    currentTime = scrollFraction * videoDuration;

    // Update video time
    video.currentTime = currentTime;

    // Calculate recoil velocity (proportional to scroll speed)
    recoilVelocity = lastScrollDirection * (scrollSpeed / 100) * (videoDuration / 100) * 0.05; // Adjust for smoothness

    // Update tracking variables
    lastScrollY = scrollY;
    lastScrollTime = now;
    recoilStartTime = now;
});

// Render loop to draw video frames and handle recoil
function render() {
    // Update video frame on canvas
    if (video.readyState >= video.HAVE_CURRENT_DATA) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }

    // Handle recoil when not scrolling
    if (!isScrolling && recoilStartTime !== null) {
        const elapsed = (performance.now() - recoilStartTime) / 1000; // Seconds
        if (elapsed < recoilDuration) {
            // Apply easing (linear decay) to recoil
            const progress = elapsed / recoilDuration;
            const ease = 1 - progress; // Linear ease-out
            const recoilTimeIncrement = recoilVelocity * ease;

            currentTime += recoilTimeIncrement;
            currentTime = Math.max(0, Math.min(currentTime, videoDuration));
            video.currentTime = currentTime;
        } else {
            // Stop recoil after duration
            recoilStartTime = null;
            recoilVelocity = 0;
        }
    }

    // Reset scrolling flag after a short delay (debounce scroll end)
    if (isScrolling) {
        setTimeout(() => {
            isScrolling = false;
            if (recoilStartTime === null) {
                recoilStartTime = performance.now();
            }
        }, 100); // 100ms debounce
    }

    // Continue rendering
    requestAnimationFrame(render);
}

// Handle window resize to adjust canvas and body height
window.addEventListener('resize', () => {
    const aspectRatio = video.videoWidth / video.videoHeight;
    const container = document.querySelector('.hero-image-container');
    let canvasWidth = container.offsetWidth; // Column width
    let canvasHeight = canvasWidth / aspectRatio;
    // Limit to viewport height if too tall
    if (canvasHeight > window.innerHeight /** 0.8*/) {
        canvasHeight = window.innerHeight /** 0.8*/;
        canvasWidth = canvasHeight * aspectRatio;
    }
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    // Update body height
    const scrollHeight = Math.max(videoDuration * 100, window.innerHeight * 2);
    document.body.style.height = `${scrollHeight}px`;
});