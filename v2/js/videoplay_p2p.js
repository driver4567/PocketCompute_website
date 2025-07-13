// Global variables
const video = document.getElementById('video_scrub');
const container = document.querySelector('.hero-image-container');

let videoDuration = 0;
let videoFPS = 0;
let totalFrames = 0;
let isMP4 = false; // Track if we're dealing with MP4
let seekQueue = []; // Queue for batching seeks
let lastSeekTime = 0;

let targetTime = 0; // Target time in the video (seconds)
let currentDisplayTime = 0; // Smoothly interpolated current time
let isAnimating = false;

// Scroll state
let scrollTimeout;
let isScrolling = false;

// Smooth seeking parameters - optimized for MP4
const SEEK_SMOOTHING = 0.04; // Slower for MP4 to reduce seeking frequency
const MIN_TIME_DIFF = 0.033; // ~2 frames at 60fps (reduced seeking frequency)
const SCROLL_DEBOUNCE_MS = 100; // Faster debounce for more responsive feel
const FAST_SEEK_THRESHOLD = 2.0; // Higher threshold before fast seeking
const MP4_SEEK_DAMPENING = 0.6; // Additional dampening for MP4 files

// Is the video on the same side by side (so at the top of the screen), where I want a fast scroll, 
// or is the video below the hero-content, where there is more vertical scroll to be had and I want a slower scroll
let videoBelowText = false;

// --- Initialization ---
video.addEventListener('loadedmetadata', () => {
    videoDuration = video.duration;
    
    // Detect if this is an MP4 file
    const videoSrc = video.src || video.currentSrc || '';

    console.log(videoSrc);
    alert(videoSrc);

    //REMOVING the slow scroll for MP4, as I have added in more keyframes to fix the jittery scroll issue, thus a slower scroll is not needed
    //isMP4 = videoSrc.toLowerCase().includes('.mp4') || video.videoTracks?.[0]?.codecPrivate?.includes('avc') || false;
    //CHANGING the intension of this switch, I will not use this switch for slower scrolling when using MP4, instead I will use this for when the 
    //         video is inline under the hero-content, as then the vertical scroll covers a further distance, and I will want the animation of the video to last longer.
    //         So at 660px page width and below, this is inline, However depending on the language loaded this will vary, so I want a more dynamic way to choose this 
    //         rather than pixels.
    isMP4 = videoBelowText;
    
    // FPS detection
    if (video.videoTracks && video.videoTracks.length > 0) {
        const track = video.videoTracks[0];
        videoFPS = track.frameRate || 60;
    } else {
        videoFPS = 60;
        //console.warn("Could not detect video FPS. Using fallback:", videoFPS);
    }
    
    totalFrames = Math.round(videoDuration * videoFPS);
    //console.log(`Video type: ${isMP4 ? 'MP4' : 'Other'}, FPS: ${videoFPS}, Total Frames: ${totalFrames}, Duration: ${videoDuration}s`);
    alert(`Video type: ${isMP4 ? 'MP4' : 'Other'}, FPS: ${videoFPS}, Total Frames: ${totalFrames}, Duration: ${videoDuration}s`);

    setupVideo();
    
    // Set scroll height - reduce for MP4 to make scrubbing less sensitive
    // NOTE: this means for every 15px of vertical movement the MP4 goes 1 frame
    //const scrollHeightPerFrame = isMP4 ? 15 : 10; // More scroll needed per frame for MP4
    const scrollHeightPerFrame = 10; //changing cause I think this still looks ok. <--- ** But this is an important setting
    const minScrollHeight = window.innerHeight * 3;
    const calculatedHeight = totalFrames * scrollHeightPerFrame;
    document.body.style.height = `${Math.max(minScrollHeight, calculatedHeight)}px`;
    
    // Initialize
    targetTime = 0;
    currentDisplayTime = 0;
    video.currentTime = 0;
    video.muted = true;
    
    // Pre-load video for better seeking performance
    if (isMP4) {
        video.preload = 'auto'; // Load more data for MP4
    }
    
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

// Batched seeking function for MP4 optimization
function batchedSeek(targetTime) {
    const now = performance.now();
    
    // For MP4, batch seeks to reduce frequency
    if (isMP4) {
        seekQueue.push(targetTime);
        
        // Only seek if enough time has passed since last seek
        if (now - lastSeekTime > 33) { // ~30fps seeking for MP4
            const latestTime = seekQueue[seekQueue.length - 1];
            seekQueue = [];
            video.currentTime = latestTime;
            lastSeekTime = now;
        }
    } else {
        // Direct seeking for other formats
        video.currentTime = targetTime;
    }
}

// Smooth seeking animation loop - optimized for MP4
function startSmoothSeekLoop() {
    function smoothSeek() {
        if (isAnimating) {
            const timeDiff = targetTime - currentDisplayTime;
            const absTimeDiff = Math.abs(timeDiff);
            
            if (absTimeDiff > MIN_TIME_DIFF) {
                // Dynamic smoothing based on format and scroll state
                let smoothing = SEEK_SMOOTHING;
                
                // Apply MP4-specific dampening
                if (isMP4) {
                    smoothing *= MP4_SEEK_DAMPENING;
                }
                
                if (isScrolling) {
                    // More responsive while actively scrolling
                    smoothing = Math.min(isMP4 ? 0.08 : 0.15, smoothing * 2);
                } else {
                    // Smoother when scroll has stopped
                    smoothing = smoothing;
                }
                
                // Use faster seeking for large distances
                if (absTimeDiff > FAST_SEEK_THRESHOLD) {
                    const multiplier = Math.min(3, absTimeDiff / FAST_SEEK_THRESHOLD);
                    smoothing = Math.min(isMP4 ? 0.15 : 0.3, smoothing * multiplier);
                }
                
                // Apply easing for more natural movement
                const easedDiff = timeDiff * smoothing;
                currentDisplayTime += easedDiff;
                
                // Clamp to video bounds
                currentDisplayTime = Math.max(0, Math.min(currentDisplayTime, videoDuration));
                
                // Use batched seeking for MP4
                batchedSeek(currentDisplayTime);
            } else {
                // Close enough - snap to target and stop animating
                currentDisplayTime = targetTime;
                batchedSeek(targetTime);
                
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
        
        const scrollHeightPerFrame = isMP4 ? 15 : 10; // Adjust for format
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
video.preload = 'metadata'; // Will be changed to 'auto' for MP4 in loadedmetadata
video.muted = true;
video.loop = false;

// Add event listeners for better MP4 seeking
video.addEventListener('seeking', () => {
    // Optional: Add visual feedback during seeking
});

video.addEventListener('seeked', () => {
    // Flush any remaining queued seeks for MP4
    if (isMP4 && seekQueue.length > 0) {
        const latestTime = seekQueue[seekQueue.length - 1];
        seekQueue = [];
        video.currentTime = latestTime;
    }
});

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

// Enhanced scroll handler with MP4 optimizations
let scrollRaf;
window.addEventListener('scroll', () => {
    if (scrollRaf) return;
    
    scrollRaf = requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const maxScroll = document.body.offsetHeight - window.innerHeight;
        
        // Calculate and apply easing to scroll fraction
        const rawScrollFraction = Math.max(0, Math.min(scrollY / maxScroll, 1));
        
        // Apply different easing curves for different formats
        let easedScrollFraction;
        if (isMP4) {
            // Gentler easing for MP4 to reduce seeking artifacts
            easedScrollFraction = rawScrollFraction * rawScrollFraction * (3 - 2 * rawScrollFraction); // Smoothstep
        } else {
            easedScrollFraction = applyScrollEasing(rawScrollFraction);
        }
        
        const newTargetTime = easedScrollFraction * videoDuration;
        const timeDiff = Math.abs(newTargetTime - targetTime);
        
        // Use larger threshold for MP4 to reduce seeking frequency
        const threshold = isMP4 ? MIN_TIME_DIFF * 2 : MIN_TIME_DIFF;
        
        if (timeDiff > threshold) {
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

//console.log('Smooth video seeking initialized with MP4 optimizations!');



// -------------------------------------------------------------------------------------------------------------------------
//
// Below is code to show an image, until the video loads, if the video can't load on the browser the image will stay in place, taking care of browser compatibility
//

function checkVideoSupport() {
    const video = document.createElement('video');
    return !!(video.canPlayType && (
        video.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/no/, '') ||
        video.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/no/, '') ||
        video.canPlayType('video/webm; codecs="vp9, vorbis"').replace(/no/, '')
    ));
}

function swapImageToVideo() {
    const img = document.getElementById('fallbackImage');
    const video = document.getElementById('video_scrub');
    
    // Check if browser supports video
    if (!checkVideoSupport()) {
        console.log('Browser does not support video');
        return;
    }
    
    // Set up video event listeners
    video.addEventListener('loadeddata', function() {
        //console.log('Video data loaded, swapping elements');
        
        // Hide image and show video
        img.classList.add('hidden');
        video.classList.remove('hidden');
    });
    
    /*
    video.addEventListener('error', function(e) {
        console.error('Video failed to load:', e);
    });
    
    video.addEventListener('loadstart', function() {
        console.log('Video loading started');
    });
    */
    
    // Start loading the video
    video.load();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    //console.log('Page loaded, starting video check and load');
    swapImageToVideo();
});



//------------------------------------------------------------------------------------------------------------------------------------
//
// Javascript to check if the video is sitting in the hero row, side by side with the hero-content, or if it's vertically inline as you get on a skinner page width
//

function checkColumnLayout() {
    //Rather than comparing the if the top of the elements match (left and right), just check that the video, is at the top of the row.
    //const colA = document.getElementById('hero_left_col');
    const row = document.getElementById('hero-row');
    const colB = document.getElementById('hero_right_col');

    if (!row || !colB) {
        //console.warn('One or both column elements not found.');
        return;
    }

    const rectA = row.getBoundingClientRect();
    const rectB = colB.getBoundingClientRect();

    // Check if their top positions are roughly the same
    // Allow for a small margin of error (e.g., 1px or less) due to rendering
    const threshold = 150; // pixels

    //console.log(Math.abs(rectA.top - rectB.top));
    if (Math.abs(rectA.top - rectB.top) < threshold) {
        //console.log('Elements are side-by-side (single row) - video to the right of text');
        videoBelowText =  false;
        isMP4 = videoBelowText;  // Re-using the functionalty where if it was an MP4 I was going to scroll slower, as the MP4 had less keyframes which made it jittery, but I added more frames
    } else {
        //console.log('Elements are stacked (multi-row) - video below text');
        videoBelowText = true;
        isMP4 = videoBelowText;
    }
}

// Call the function initially
checkColumnLayout();

// Add an event listener to check on window resize
window.addEventListener('resize', checkColumnLayout);
