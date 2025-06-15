// Global variables
const video = document.getElementById('video_scrub');
const canvas = document.getElementById('video_canvas');
const ctx = canvas.getContext('2d');
const container = document.querySelector('.hero-image-container');

let videoDuration = 0;
let videoFPS = 0;
let totalFrames = 0;

let targetTime = 0; // Target time in the video (seconds)
let currentDisplayTime = 0; // Smoothly interpolated current time
let isAnimating = false;
let animationFrameId = null;

// Scroll state
let scrollTimeout;
let isScrolling = false;

// Smooth seeking parameters
const SEEK_SMOOTHING = 0.08; // Lower = smoother, higher = more responsive (0.05-0.2)
const MIN_TIME_DIFF = 0.016; // ~1 frame at 60fps
const SCROLL_DEBOUNCE_MS = 1000;
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

    setupCanvas();
    
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
    startRenderLoop();
    container.style.opacity = '1';
});

function setupCanvas() {
    // Ensure video dimensions are available
    if (!video.videoWidth || !video.videoHeight) {
        console.warn('Video dimensions not available yet');
        return;
    }
    
    const aspectRatio = video.videoWidth / video.videoHeight;
    let canvasWidth = container.offsetWidth;
    let canvasHeight = canvasWidth / aspectRatio;
    
    const maxViewportHeight = window.innerHeight * 0.8;
    if (canvasHeight > maxViewportHeight) {
        canvasHeight = maxViewportHeight;
        canvasWidth = canvasHeight * aspectRatio;
    }
    
    // Store previous canvas size to detect actual changes
    const prevWidth = canvas.width;
    const prevHeight = canvas.height;
    
    // Set canvas resolution (internal size)
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Set display size
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    canvas.style.display = 'block';
    
    // If canvas size actually changed, ensure we redraw
    if (prevWidth !== canvas.width || prevHeight !== canvas.height) {
        // Clear and force immediate redraw
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (video.readyState >= video.HAVE_CURRENT_DATA) {
            requestAnimationFrame(() => drawFrame());
        }
    }
}

// Scroll handler
/*
let scrollRaf;
window.addEventListener('scroll', () => {
    if (scrollRaf) return;
    
    scrollRaf = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = document.body.offsetHeight - window.innerHeight;
        
        // Calculate target time based on scroll position
        const scrollFraction = Math.max(0, Math.min(scrollY / maxScroll, 1));
        const newTargetTime = scrollFraction * videoDuration;
        
        const timeDiff = Math.abs(newTargetTime - targetTime);
        
        // Only update if there's a meaningful change
        if (timeDiff > MIN_TIME_DIFF) {
            targetTime = newTargetTime;
            isScrolling = true;
            isAnimating = true;
        }
        
        // Reset scroll timeout
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, SCROLL_DEBOUNCE_MS);
        
        scrollRaf = null;
    });
});
*/

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

// Render loop for canvas updates with resize safety
function startRenderLoop() {
    function render() {
        // Ensure canvas is valid before drawing
        if (ensureCanvasContext()) {
            drawFrame();
        }
        animationFrameId = requestAnimationFrame(render);
    }
    animationFrameId = requestAnimationFrame(render);
}


// Handle video events that might affect display
video.addEventListener('loadeddata', () => {
    // Video data is loaded and ready
    if (canvas.width > 0 && canvas.height > 0) {
        drawFrame();
    }
});

video.addEventListener('canplay', () => {
    // Video can start playing - ensure frame is drawn
    drawFrame();
});

// Handle video seeking events for better performance
let isVideoSeeking = false;
video.addEventListener('seeking', () => {
    isVideoSeeking = true;
});

video.addEventListener('seeked', () => {
    isVideoSeeking = false;
    drawFrame(); // Ensure frame is drawn after seek completes
});

// Additional safety check for canvas context
function ensureCanvasContext() {
    if (!ctx || canvas.width === 0 || canvas.height === 0) {
        console.warn('Canvas context invalid, attempting to restore');
        setupCanvas();
        return false;
    }
    return true;
}

// Optimize drawing - only draw when video time actually changes
let lastDrawnTime = -1;
function drawFrame() {
    if (video.readyState >= video.HAVE_CURRENT_DATA) {
        const currentTime = video.currentTime;
        
        // Only redraw if time has changed significantly or if we're seeking
        if (Math.abs(currentTime - lastDrawnTime) > (1/videoFPS) * 0.5 || isVideoSeeking) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            lastDrawnTime = currentTime;
        }
    }
}

/*
function drawFrame() {
    if (video.readyState >= video.HAVE_CURRENT_DATA) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
}*/
// Updated drawFrame
/*function drawFrame() {

    console.log("redraw??");

    if (!ensureCanvasContext()) return;

    console.log(video.readyState);

    if (video.readyState >= video.HAVE_CURRENT_DATA) {
        const currentTime = video.currentTime;

        // Redraw if time changed, seeking, or forced
        if (isVideoSeeking || Math.abs(currentTime - lastDrawnTime) > (1 / videoFPS) * 0.5) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            lastDrawnTime = currentTime;

            console.log("redraw");
        }
    } else {
        // Retry if video isn't ready
        requestAnimationFrame(() => drawFrame());
        console.log("retry");
    }
}*/

// Enhanced resize handler with better video handling
let resizeTimeout;
let isResizing = false;

window.addEventListener('resize', () => {
    isResizing = true;
    clearTimeout(resizeTimeout);
    
    // Immediate resize for responsive feel
    setupCanvas();
    
    // Force redraw immediately
    console.log(video.readyState);
    if (video.readyState >= video.HAVE_CURRENT_DATA) {
        drawFrame();
    }
    
    resizeTimeout = setTimeout(() => {
        // Final resize and cleanup
        setupCanvas();
        
        const scrollHeightPerFrame = 10;
        const minScrollHeight = window.innerHeight * 3;
        const calculatedHeight = totalFrames * scrollHeightPerFrame;
        document.body.style.height = `${Math.max(minScrollHeight, calculatedHeight)}px`;
        
        // Ensure video is properly positioned and drawn
        if (video.readyState >= video.HAVE_CURRENT_DATA) {
            // Small delay to ensure canvas is fully resized
            setTimeout(() => {
                drawFrame();
                isResizing = false;
            }, 50);
        } else {
            isResizing = false;
        }
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

// Enhanced scroll handler with easing (optional - uncomment to use)
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

console.log('Smooth video scrubbing initialized - no reverse playback required!');