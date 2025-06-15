// Get DOM elements
const video = document.getElementById('video');
const canvas = document.getElementById('video_canvas');
const ctx = canvas.getContext('2d');
const container = document.querySelector('.hero-image-container'); // Moved for early access

// Video control variables
let videoDuration = 0;
let currentTime = 0;
let lastScrollY = window.scrollY; // Track last scroll position
let animationFrameId = null; // Store requestAnimationFrame ID

// Recoil/Smoothness variables
let targetTime = 0; // Where the video *should* be
let currentScrollTime = 0; // Time based purely on scroll position
let recoilActive = false;
let recoilStartValue = 0; // The video.currentTime when recoil starts
let recoilEndValue = 0; // The video.currentTime target for recoil
let recoilStartTime = 0;
const RECOIL_DURATION = 300; // milliseconds for recoil
const SCROLL_TO_TIME_FACTOR = 0.05; // Adjust this to control how much scroll affects time, smaller = less sensitivity

// --- Initialization ---
video.addEventListener('loadedmetadata', () => {
    videoDuration = video.duration;
    // console.log("Video Duration:", videoDuration);

    // Set canvas size based on video dimensions, scaled to container width
    const aspectRatio = video.videoWidth / video.videoHeight;
    let canvasWidth = container.offsetWidth; // Column width
    let canvasHeight = canvasWidth / aspectRatio;

    // Limit to viewport height if too tall, ensuring responsiveness
    const maxViewportHeight = window.innerHeight * 0.8; // Use 80% of viewport height as a limit
    if (canvasHeight > maxViewportHeight) {
        canvasHeight = maxViewportHeight;
        canvasWidth = canvasHeight * aspectRatio;
    }

    // Set native canvas resolution for drawing
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    // Set display size via CSS for scaling
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    canvas.style.display = 'block'; // Show canvas

    // Set body height based on video duration
    // A multiplier of 100px per second for 2s is only 200px. This might not be enough scroll range.
    // Ensure sufficient scroll range for smoothness.
    const desiredScrollRange = window.innerHeight * 5; // e.g., 5 times viewport height
    const scrollHeight = Math.max(desiredScrollRange, videoDuration * 200); // Higher multiplier for short videos
    document.body.style.height = `${scrollHeight}px`;
    // console.log("Body Height:", document.body.style.height);

    // Initial draw and start rendering loop
    drawFrame();
    if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(render);
    }

    // Handle opacity animation (assuming .hero-image-container starts with opacity-0)
    container.style.opacity = '1';
});

// --- Scroll Event Handler ---
// Use a throttled/debounced scroll handler for performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.offsetHeight - window.innerHeight;

    // Calculate scroll progress (0 to 1)
    const scrollFraction = Math.max(0, Math.min(scrollY / maxScroll, 1));

    // Map scroll position directly to video time
    currentScrollTime = scrollFraction * videoDuration;

    // When scrolling, immediately set targetTime to currentScrollTime
    targetTime = currentScrollTime;

    // If recoil was active, stop it
    recoilActive = false;

    // Update video time directly while scrolling for responsiveness
    // This is the immediate visual feedback
    video.currentTime = currentScrollTime;

    // Clear any previous debounce timeout
    clearTimeout(scrollTimeout);
    // Set a timeout to detect when scrolling has stopped
    scrollTimeout = setTimeout(() => {
        // Scrolling has stopped, initiate recoil
        recoilActive = true;
        recoilStartTime = performance.now();
        recoilStartValue = video.currentTime; // Where it is currently
        recoilEndValue = currentScrollTime; // Where it should end up (pure scroll position)
        // If the current video.currentTime is already very close to targetTime, skip recoil
        if (Math.abs(recoilEndValue - recoilStartValue) < 0.01) { // 0.01 seconds threshold
            recoilActive = false;
        }

    }, 80); // Adjust this debounce delay (e.g., 50ms - 100ms)
});


// --- Render Loop (using requestAnimationFrame) ---
function render() {
    // Draw current video frame to canvas
    drawFrame();

    // Handle recoil when active
    if (recoilActive) {
        const elapsed = performance.now() - recoilStartTime;
        const progress = Math.min(1, elapsed / RECOIL_DURATION); // Clamp progress to 0-1

        // Apply an easing function for smoother recoil
        // Ease-out Cubic function (adjust as needed)
        const easedProgress = 1 - Math.pow(1 - progress, 3); // More subtle easing

        // Interpolate current time towards the target time
        currentTime = recoilStartValue + (recoilEndValue - recoilStartValue) * easedProgress;
        currentTime = Math.max(0, Math.min(currentTime, videoDuration)); // Clamp

        video.currentTime = currentTime;

        // If recoil is finished, deactivate it
        if (progress >= 1) {
            recoilActive = false;
            // Ensure it snaps to the exact target at the end
            video.currentTime = recoilEndValue;
        }
    }

    // Continue the loop
    animationFrameId = requestAnimationFrame(render);
}

// Helper function to draw video frame
function drawFrame() {
    if (video.readyState >= video.HAVE_CURRENT_DATA) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
}

// --- Resize Handler ---
window.addEventListener('resize', () => {
    const aspectRatio = video.videoWidth / video.videoHeight;
    const container = document.querySelector('.hero-image-container'); // Re-query in case DOM changes
    let canvasWidth = container.offsetWidth;
    let canvasHeight = canvasWidth / aspectRatio;

    const maxViewportHeight = window.innerHeight * 0.8;
    if (canvasHeight > maxViewportHeight) {
        canvasHeight = maxViewportHeight;
        canvasWidth = canvasHeight * aspectRatio;
    }

    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    // Update body height as well
    const desiredScrollRange = window.innerHeight * 5;
    const scrollHeight = Math.max(desiredScrollRange, videoDuration * 200);
    document.body.style.height = `${scrollHeight}px`;

    // Redraw immediately after resize to avoid flickering
    drawFrame();
});

// Optional: Pause video when not in viewport to save resources (if not muted autoplay)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Video is in view, might want to do something if it's not muted autoplay
        } else {
            // Video is out of view, pause if it's meant to be controlled
            // video.pause(); // Uncomment if you want to pause it when off-screen
        }
    });
}, { threshold: 0.1 }); // Trigger when 10% of the video is visible
observer.observe(video);