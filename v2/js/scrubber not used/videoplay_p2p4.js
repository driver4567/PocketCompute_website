// Global variables
const video = document.getElementById('video_scrub');
const container = document.querySelector('.hero-image-container');

let videoDuration = 0;
let videoFPS = 0;
let totalFrames = 0;

let targetTime = 0; // Target time in the video (seconds)
let currentDisplayTime = 0; // Smoothly interpolated current time
let isAnimating = false;

// Scroll state
let scrollTimeout;
let isScrolling = false;

// Smooth seeking parameters
const SEEK_SMOOTHING = 0.08; // Lower = smoother, higher = more responsive (0.05-0.2)
const MIN_TIME_DIFF = 0.016; // ~1 frame at 60fps
const SCROLL_DEBOUNCE_MS = 200;
const FAST_SEEK_THRESHOLD = 1.0; // Seconds - beyond this, use faster seeking

// --- Initialization ---
video.addEventListener('loadedmetadata', () => {
    videoDuration = video.duration;
    
    // FPS detection
    if (video.videoTracks && video.videoTracks.length > 0) {
        const track = video.videoTracks[0];
        videoFPS = track.frameRate || 60;
    } else {
        videoFPS = 60;
        //console.warn("Could not detect video FPS. Using fallback:", videoFPS);
    }
    
    totalFrames = Math.round(videoDuration * videoFPS);
    //console.log(`Video FPS: ${videoFPS}, Total Frames: ${totalFrames}, Duration: ${videoDuration}s`);

    setupVideo();
    
    // Set scroll height
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

function setupVideo() {
    // Set video display size to fit container
    const aspectRatio = video.videoWidth / video.videoHeight;
    let videoWidth = container.offsetWidth;
    let videoHeight = videoWidth / aspectRatio;
    
    const maxViewportHeight = window.innerHeight * 0.8;
    if (videoHeight > maxViewportHeight) {
        videoHeight = maxViewportHeight;
        videoWidth = videoHeight * aspectRatio;
    }
    
    // Set video display size
    video.style.width = `${videoWidth}px`;
    video.style.height = `${videoHeight}px`;
    video.style.display = 'block';
}

// Smooth seeking animation loop
function startSmoothSeekLoop() {
    function smoothSeek() {
        if (isAnimating) {
            const timeDiff = targetTime - currentDisplayTime;
            const absTimeDiff = Math.abs(timeDiff);
            
            if (absTimeDiff > MIN_TIME_DIFF) {
                // Dynamic smoothing based on distance and scroll state
                let smoothing = SEEK_SMOOTHING;
                
                if (isScrolling) {
                    // More responsive while actively scrolling
                    smoothing = Math.min(0.15, SEEK_SMOOTHING * 2);
                } else {
                    // Smoother when scroll has stopped
                    smoothing = SEEK_SMOOTHING;
                }
                
                // Use faster seeking for large distances
                if (absTimeDiff > FAST_SEEK_THRESHOLD) {
                    smoothing = Math.min(0.3, smoothing * (absTimeDiff / FAST_SEEK_THRESHOLD));
                }
                
                // Apply easing for more natural movement
                const easedDiff = timeDiff * smoothing;
                currentDisplayTime += easedDiff;
                
                // Clamp to video bounds
                currentDisplayTime = Math.max(0, Math.min(currentDisplayTime, videoDuration));
                
                // Update video time
                video.currentTime = currentDisplayTime;
            } else {
                // Close enough - snap to target and stop animating
                currentDisplayTime = targetTime;
                video.currentTime = targetTime;
                
                if (!isScrolling) {
                    isAnimating = false;
                }
            }
        }
        
        requestAnimationFrame(smoothSeek);
    }
    
    requestAnimationFrame(smoothSeek);
}

// Enhanced resize handler
let resizeTimeout;
let isResizing = false;

window.addEventListener('resize', () => {
    isResizing = true;
    clearTimeout(resizeTimeout);
    
    // Immediate resize for responsive feel
    setupVideo();
    
    resizeTimeout = setTimeout(() => {
        // Final resize and cleanup
        setupVideo();
        
        const scrollHeightPerFrame = 10;
        const minScrollHeight = window.innerHeight * 3;
        const calculatedHeight = totalFrames * scrollHeightPerFrame;
        document.body.style.height = `${Math.max(minScrollHeight, calculatedHeight)}px`;
        
        setTimeout(() => {
            isResizing = false;
        }, 50);
    }, 150);
});

// Intersection Observer for performance
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            // Optionally reduce update frequency when not visible
            // For now, we'll keep updating for smooth experience
        }
    });
}, { threshold: 0.1 });

observer.observe(container);

// Video setup
video.preload = 'metadata';
video.muted = true;
video.loop = false;

// Handle visibility changes for better performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, optionally pause animations
    } else {
        // Page is visible again, resume normal operation
        if (Math.abs(targetTime - currentDisplayTime) > MIN_TIME_DIFF) {
            isAnimating = true;
        }
    }
});

// Utility function for smoother scroll-to-time mapping
function applyScrollEasing(fraction) {
    // Apply ease-out cubic for more natural feel
    return 1 - Math.pow(1 - fraction, 3);
}

// Enhanced scroll handler with easing
let scrollRaf;
window.addEventListener('scroll', () => {
    if (scrollRaf) return;
    
    scrollRaf = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = document.body.offsetHeight - window.innerHeight;
        
        // Calculate and apply easing to scroll fraction
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
        }, SCROLL_DEBOUNCE_MS);
        
        scrollRaf = null;
    });
});

console.log('Smooth video seeking initialized - direct video playback!');