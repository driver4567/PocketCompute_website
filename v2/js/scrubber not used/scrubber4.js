// Global variables
const video = document.getElementById('video');
const canvas = document.getElementById('video_canvas');
const ctx = canvas.getContext('2d');
const container = document.querySelector('.hero-image-container');

let videoDuration = 0;
let videoFPS = 0;
let totalFrames = 0;

let targetFrame = 0;
let currentFrame = 0;
let displayFrame = 0; // Smoothly interpolated frame for display

let lastScrollY = window.scrollY;
let scrollTimeout;
let animationFrameId = null;

// Smoothing variables
let isScrolling = false;
const SMOOTHING_FACTOR = 0.15; // Lower = smoother but more lag, Higher = more responsive
const FRAME_THRESHOLD = 0.1; // Minimum difference to trigger updates

// Recoil variables
let recoilActive = false;
let recoilStartFrame = 0;
let recoilEndFrame = 0;
let recoilStartTime = 0;
const RECOIL_DURATION_MS = 2000; // was 200 - Reduced for snappier feel

// Performance optimization
let lastUpdateTime = 0;
const UPDATE_INTERVAL = 16; // ~60fps updates (16ms)

// --- Initialization ---
video.addEventListener('loadedmetadata', () => {
    videoDuration = video.duration;  //2.03
    //console.warn("Video Duration:", videoDuration);
    
    // Improved FPS detection with fallbacks
    if (video.videoTracks && video.videoTracks.length > 0) {
        const track = video.videoTracks[0];
        if (track.frameRate) {
            videoFPS = track.frameRate;
        } else {
            // Try getting from video element settings
            videoFPS = video.frameRate || 60; // Fallback to 60fps
        }
    } else {
        // Common video FPS fallbacks
        videoFPS = 60;  // *** the frame rate according the ffprobe is meant to be 60, but the scrubbing is smoother with this set lower
        console.warn("Could not detect video FPS. Using fallback:", videoFPS);
    }
    
    totalFrames = Math.round(videoDuration * videoFPS); // = 122
    console.log(`Video FPS: ${videoFPS}, Total Frames: ${totalFrames}, Duration: ${videoDuration}s`);

    // Canvas setup with better sizing
    setupCanvas();
    
    // Optimized scroll height calculation
    const scrollHeightPerFrame = 8; // Slightly reduced for finer control
    const minScrollHeight = window.innerHeight * 3; // Minimum scroll distance
    const calculatedHeight = totalFrames * scrollHeightPerFrame;
    document.body.style.height = `${Math.max(minScrollHeight, calculatedHeight)}px`;
    
    // Initialize display
    displayFrame = 0;
    currentFrame = 0;
    targetFrame = 0;
    
    // Preload first frame
    video.currentTime = 0;
    video.addEventListener('seeked', drawFrame, { once: true });
    
    startRenderLoop();
    container.style.opacity = '1';
});

// Improved canvas setup
function setupCanvas() {
    const aspectRatio = video.videoWidth / video.videoHeight;
    let canvasWidth = container.offsetWidth;
    let canvasHeight = canvasWidth / aspectRatio;
    
    const maxViewportHeight = window.innerHeight * 0.8;
    if (canvasHeight > maxViewportHeight) {
        canvasHeight = maxViewportHeight;
        canvasWidth = canvasHeight * aspectRatio;
    }
    
    // Set actual canvas resolution
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Set display size
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    canvas.style.display = 'block';
}

// Optimized scroll handler with throttling
let scrollRaf;
window.addEventListener('scroll', () => {
    if (scrollRaf) return; // Throttle to one call per animation frame
    
    scrollRaf = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = document.body.offsetHeight - window.innerHeight;
        
        // Calculate scroll progress (0 to 1)
        const scrollFraction = Math.max(0, Math.min(scrollY / maxScroll, 1));
        
        // Apply easing to scroll input for smoother feel
        const easedFraction = easeOutCubic(scrollFraction);
        
        // Map to target frame
        const newTargetFrame = Math.round(easedFraction * (totalFrames - 1));
        
        // Only update if there's a meaningful change
        if (Math.abs(newTargetFrame - targetFrame) > FRAME_THRESHOLD) {
            targetFrame = newTargetFrame;
            isScrolling = true;
            
            // Stop any active recoil
            recoilActive = false;
        }
        
        // Reset scroll timeout
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
            // Initiate recoil if needed
            if (Math.abs(displayFrame - targetFrame) > 1) {
                startRecoil();
            }
        }, 100);
        
        scrollRaf = null;
    });
});

// Easing function for smoother scroll mapping
function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

// Start recoil animation
function startRecoil() {
    recoilActive = true;
    recoilStartTime = performance.now();
    recoilStartFrame = displayFrame;
    recoilEndFrame = targetFrame;
}

// Main render loop with performance optimizations
function startRenderLoop() {
    function render(timestamp) {
        // Throttle updates for better performance
        if (timestamp - lastUpdateTime < UPDATE_INTERVAL) {
            animationFrameId = requestAnimationFrame(render);
            return;
        }
        lastUpdateTime = timestamp;
        
        let frameChanged = false;
        
        if (recoilActive) {
            // Handle recoil animation
            const elapsed = performance.now() - recoilStartTime;
            const progress = Math.min(1, elapsed / RECOIL_DURATION_MS);
            const easedProgress = easeOutQuart(progress);
            
            const newDisplayFrame = recoilStartFrame + (recoilEndFrame - recoilStartFrame) * easedProgress;
            
            if (Math.abs(newDisplayFrame - displayFrame) > FRAME_THRESHOLD) {
                displayFrame = newDisplayFrame;
                frameChanged = true;
            }
            
            if (progress >= 1) {
                recoilActive = false;
                displayFrame = recoilEndFrame;
                frameChanged = true;
            }
        } else {
            // Smooth interpolation towards target
            const frameDiff = targetFrame - displayFrame;
            if (Math.abs(frameDiff) > FRAME_THRESHOLD) {
                displayFrame += frameDiff * SMOOTHING_FACTOR;
                frameChanged = true;
            }
        }
        
        // Update video time and draw only if frame changed significantly
        if (frameChanged) {
            const clampedFrame = Math.max(0, Math.min(Math.round(displayFrame), totalFrames - 1));
            const newTime = clampedFrame / videoFPS;
            
            // Only seek if the time difference is meaningful
            if (Math.abs(video.currentTime - newTime) > (1/videoFPS) * 0.5) {
                video.currentTime = newTime;
                currentFrame = clampedFrame;
            }
        }
        
        drawFrame();
        animationFrameId = requestAnimationFrame(render);
    }
    
    animationFrameId = requestAnimationFrame(render);
}

// Improved easing function for recoil
function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
}

// Optimized draw function
function drawFrame() {
    if (video.readyState >= video.HAVE_CURRENT_DATA) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
}

// Resize handler with debouncing
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        setupCanvas();
        
        // Recalculate body height
        const scrollHeightPerFrame = 8;
        const minScrollHeight = window.innerHeight * 3;
        const calculatedHeight = totalFrames * scrollHeightPerFrame;
        document.body.style.height = `${Math.max(minScrollHeight, calculatedHeight)}px`;
        
        drawFrame();
    }, 100);
});

// Improved Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting && !isScrolling) {
            // Optionally pause rendering when not visible and not scrolling
            // This can help with performance
        }
    });
}, { threshold: 0.1 });

observer.observe(container);

// Additional optimization: Preload video metadata
video.preload = 'metadata';
video.muted = true; // Helps with autoplay policies