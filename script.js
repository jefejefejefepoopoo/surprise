// ============================================
// VALENTINE'S DAY INTERACTIVE SCRIPT
// ============================================
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const mainContent = document.getElementById('mainContent');
const successScreen = document.getElementById('successScreen');

let noClicks = 0;

// scale state
let yesScale = 1;
let noScale = 1;

function applyScales() {
    yesBtn.style.transform = `scale(${yesScale})`;
    noBtn.style.transform = `scale(${noScale})`;
}

function pop(el) {
    el.classList.remove("pop");
    // force reflow so animation re-triggers
    void el.offsetWidth;
    el.classList.add("pop");
}

function moveNoButton() {
    // After 3 clicks, "No" starts moving away.
    // Put it in absolute mode relative to the nearest positioned ancestor.
    const container = noBtn.closest(".heart-content") || document.body;
    container.style.position = container.style.position || "relative";

    // Switch to evasive mode only once
    if (!noBtn.classList.contains("evasive")) {
        noBtn.classList.add("evasive");

        // Place it initially where it currently is (so it doesn't jump)
        const rect = noBtn.getBoundingClientRect();
        const parentRect = container.getBoundingClientRect();
        noBtn.style.left = `${rect.left - parentRect.left}px`;
        noBtn.style.top = `${rect.top - parentRect.top}px`;
    }

    const parentRect = container.getBoundingClientRect();

    // Keep within container bounds
    const padding = 10;
    const maxX = parentRect.width - noBtn.offsetWidth - padding;
    const maxY = parentRect.height - noBtn.offsetHeight - padding;

    const x = Math.max(padding, Math.random() * maxX);
    const y = Math.max(padding, Math.random() * maxY);

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    // Add a little motion feel
    noBtn.style.transition = "left 220ms ease, top 220ms ease, transform 180ms ease";
}

noBtn.addEventListener("click", (e) => {
    e.preventDefault();
    noClicks++;

    // First 3 clicks: YES bigger, NO smaller (no moving yet)
    if (noClicks <= 3) {
        yesScale = Math.min(yesScale + 0.18, 2.2);
        noScale = Math.max(noScale - 0.12, 0.55);
        applyScales();
        pop(yesBtn);
        pop(noBtn);
        return;
    }

    // After 3 clicks: keep growing/shrinking slightly + start moving
    yesScale = Math.min(yesScale + 0.12, 2.6);
    noScale = Math.max(noScale - 0.06, 0.45);
    applyScales();
    pop(yesBtn);

    moveNoButton();
});

// Optional: make "No" also dodge on hover once evasive (fun on desktop)
noBtn.addEventListener("mouseenter", () => {
    if (noClicks >= 4) moveNoButton();
});

yesBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const success = document.getElementById("successScreen");
    success.classList.add("show");
    success.setAttribute("aria-hidden", "false");
});

// Back button handler
const backBtn = document.getElementById("backBtn");
backBtn?.addEventListener("click", () => {
    const success = document.getElementById("successScreen");
    success.classList.remove("show");
    success.setAttribute("aria-hidden", "true");
});

// ============================================
// KEYBOARD ACCESSIBILITY
// ============================================
// Allow users to interact with buttons using keyboard
// ============================================
yesBtn.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        yesBtn.click();
    }
});

noBtn.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        noBtn.click();
    }
});

// ============================================
// TOUCH DEVICE OPTIMIZATION
// ============================================
// Ensure buttons work well on mobile devices
// ============================================
yesBtn.addEventListener('touchstart', function() {
    this.style.transform = 'scale(0.95)';
});

yesBtn.addEventListener('touchend', function() {
    this.style.transform = '';
});

noBtn.addEventListener('touchstart', function() {
    this.style.transform = 'scale(0.95)';
});

noBtn.addEventListener('touchend', function() {
    this.style.transform = '';
});

// ============================================
// IMAGE ERROR HANDLING
// ============================================
// If border photos fail to load, show a subtle placeholder
// To customize placeholder, modify the background color below
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const borderPhotos = document.querySelectorAll('.border-photo');
    
    borderPhotos.forEach(photo => {
        photo.addEventListener('error', function() {
            // If image fails to load, show a gradient placeholder
            this.style.background = 'linear-gradient(135deg, #ffb3d9 0%, #ffcce6 100%)';
            this.style.display = 'block';
            this.alt = 'Photo placeholder';
        });
    });
    
    // Randomize floating hearts spawn positions
    const heartEmojis = document.querySelectorAll('.floating-hearts .heart-emoji');
    heartEmojis.forEach(heart => {
        // Randomize horizontal position (between frame width and right edge)
        const minLeft = 15; // Start after left border
        const maxLeft = 85; // End before right border
        const randomLeft = minLeft + Math.random() * (maxLeft - minLeft);
        heart.style.left = `${randomLeft}%`;
    });
});

// ============================================
// NOTES FOR CUSTOMIZATION
// ============================================
// 
// TO CHANGE TEXT:
// - Edit the h1.question-text in index.html for the main question
// - Edit the h2.success-title and p.success-message in index.html for success screen
//
// TO CHANGE IMAGES:
// - Replace the image src paths in index.html (look for /images/photo1.jpg, etc.)
// - Make sure images are in an /images/ folder relative to index.html
// - Recommended image sizes: 300x300px or larger for best quality
//
// TO CHANGE COLORS:
// - Edit the background gradients in styles.css
// - Main heart: .heart-shape background gradient
// - Yes button: .btn-yes background gradient
// - Success title: .success-title color
// - Body background: body background gradient
//
// TO ADJUST ANIMATIONS:
// - Heartbeat: Modify @keyframes heartbeat in styles.css
// - Button growth: Modify .btn-yes.grow scale value
// - Floating hearts: Modify @keyframes float in styles.css
//
// ============================================