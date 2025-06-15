// Global variables
const video = document.getElementById('video');
const canvas = document.getElementById('video_canvas');
const ctx = canvas.getContext('2d');
const container = document.querySelector('.hero-image-container');

let videoDuration = 0;
let videoFPS = 0; // Determined from metadata or hardcoded
let totalFrames = 0; // Total number of frames in the video

let targetFrame = 0; // The frame we want to display
let currentFrame = 0; // The frame currently drawn/set on video.currentTime

let lastScrollY = window.scrollY;
let scrollTimeout; // For debouncing scroll end
let animationFrameId = null;

// Recoil/Smoothness variables
let recoilActive = false;
let recoilStartFrame = 0;
let recoilEndFrame = 0;
let recoilStartTime = 0;
const RECOIL_DURATION_MS = 300; // milliseconds for recoil


// --- Initialization ---
video.addEventListener('loadedmetadata', () => {
    videoDuration = video.duration;

    // --- IMPORTANT: Determine FPS ---
    if (video.videoTracks && video.videoTracks.length > 0 && video.videoTracks[0].frameRate) {
        videoFPS = video.videoTracks[0].frameRate;
        // Sometimes frameRate can be a fraction (e.g., 29.97). Round if you want integer frames.
        // Or keep it as a float for precise time calculations.
    } else {
        // Fallback: HARDCODE YOUR VIDEO'S EXACT FPS HERE!
        // This is crucial for precise frame calculations if the browser API fails.
        videoFPS = 60; // <--- REPLACE WITH YOUR VIDEO'S ACTUAL FPS (e.g., 25, 60)
        console.warn("Could not get video FPS from metadata. Using hardcoded FPS:", videoFPS);
    }
    totalFrames = Math.round(videoDuration * videoFPS);
    console.log(`Video FPS: ${videoFPS}, Total Frames: ${totalFrames}, Duration: ${videoDuration}s`);


    // Set canvas size (same as your previous logic)
    const aspectRatio = video.videoWidth / video.videoHeight;
    let canvasWidth = container.offsetWidth;
    let canvasHeight = canvasWidth / aspectRatio;
    const maxViewportHeight = window.innerHeight * 0.8;
    if (canvasHeight > maxViewportHeight) {
        canvasHeight = maxViewportHeight;
        canvasWidth = canvasHeight * aspectRatio;
    }
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    canvas.style.display = 'block';

    // Set body height based on the number of frames for finer control
    // Example: 10 pixels per frame. Adjust 10 to control scroll sensitivity.
    const scrollHeightPerFrame = 10; // Pixels per frame
    const desiredScrollHeight = totalFrames * scrollHeightPerFrame;
    // Ensure minimum scroll height for visibility
    document.body.style.height = `${Math.max(window.innerHeight * 2, desiredScrollHeight)}px`;
    console.log("Calculated Body Height:", document.body.style.height);

    // Initial draw and start rendering loop
    drawFrame();
    if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(render);
    }
    container.style.opacity = '1';
});

// --- Scroll Event Handler ---
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const maxScroll = document.body.offsetHeight - window.innerHeight;

    // Calculate scroll progress (0 to 1)
    const scrollFraction = Math.max(0, Math.min(scrollY / maxScroll, 1));

    // Map scroll progress to a target frame number
    targetFrame = Math.round(scrollFraction * (totalFrames - 1)); // -1 to account for 0-indexing

    // Immediately update video time to the target frame's time
    video.currentTime = targetFrame / videoFPS;

    // If recoil was active, stop it
    recoilActive = false;

    // Clear any previous debounce timeout
    clearTimeout(scrollTimeout);
    // Set a timeout to detect when scrolling has stopped
    scrollTimeout = setTimeout(() => {
        // Scrolling has stopped, initiate recoil if current frame isn't the target frame
        if (Math.abs(currentFrame - targetFrame) > 0.5) { // Threshold for "close enough"
            recoilActive = true;
            recoilStartTime = performance.now();
            recoilStartFrame = currentFrame; // Where the video is currently
            recoilEndFrame = targetFrame; // Where it should end up (pure scroll position)
        }
    }, 80); // Adjust this debounce delay (e.g., 50ms - 100ms)
});

// --- Render Loop (using requestAnimationFrame) ---
function render() {
    // Handle recoil when active
    if (recoilActive) {
        const elapsed = performance.now() - recoilStartTime;
        const progress = Math.min(1, elapsed / RECOIL_DURATION_MS); // Clamp progress to 0-1

        // Apply an easing function for smoother recoil (e.g., Ease-out Cubic)
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        // Interpolate current frame towards the target frame
        currentFrame = Math.round(recoilStartFrame + (recoilEndFrame - recoilStartFrame) * easedProgress);
        currentFrame = Math.max(0, Math.min(currentFrame, totalFrames - 1));

        video.currentTime = currentFrame / videoFPS;

        // If recoil is finished, deactivate it
        if (progress >= 1) {
            recoilActive = false;
            // Ensure it snaps to the exact target frame at the end
            video.currentTime = recoilEndFrame / videoFPS;
            currentFrame = recoilEndFrame;
        }
    } else {
        // If not recoiling, keep `currentFrame` synced with actual video playback
        currentFrame = Math.round(video.currentTime * videoFPS);
    }

    // Draw current video frame to canvas
    drawFrame();

    // Continue the loop
    animationFrameId = requestAnimationFrame(render);
}

// Helper function to draw video frame
function drawFrame() {
    if (video.readyState >= video.HAVE_CURRENT_DATA) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
}

// --- Resize Handler (same as before, but update body height calculation) ---
window.addEventListener('resize', () => {
    const aspectRatio = video.videoWidth / video.videoHeight;
    let canvasWidth = container.offsetWidth;
    let canvasHeight = canvasWidth / aspectRatio;
    const maxViewportHeight = window.innerHeight * 0.8;
    if (canvasHeight > maxViewportHeight) {
        canvasHeight = maxViewportHeight;
        canvasWidth = canvasHeight * aspectRatio;
    }
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;

    const scrollHeightPerFrame = 10;
    const desiredScrollHeight = totalFrames * scrollHeightPerFrame;
    document.body.style.height = `${Math.max(window.innerHeight * 2, desiredScrollHeight)}px`;

    drawFrame();
});

// Optional: Intersection Observer (good practice)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            // video.pause(); // Uncomment if you want to pause when off-screen
        }
    });
}, { threshold: 0.1 });
observer.observe(video);