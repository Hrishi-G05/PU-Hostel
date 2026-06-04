const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// The glitch is caused by transitioning margin: 0 auto, which triggers layout recalculation loops.
// We will replace margin: 0 auto with a hardware-accelerated transform: translateX(-50%) technique.

// 1. Fix base header
const baseHeaderFix = `
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    margin: 0;
    width: 100%;
`;
html = html.replace(/top:\s*0;\s*margin:\s*0;\s*width:\s*100%;/g, baseHeaderFix);

// 2. Fix the .pu-header.scrolled block
// Remove margin: 0 auto !important;
html = html.replace(/margin:\s*0\s*auto\s*!important;/g, '');

// Also ensure we use position: fixed instead of sticky to prevent scroll-container jitter
html = html.replace(/position:\s*sticky;/g, 'position: fixed;');

// Add a spacer to the body so 'fixed' doesn't cause content to jump underneath it
const spacerCSS = `
  body { padding-top: 80px; } /* Prevent content jump since header is fixed */
`;
if (!html.includes('padding-top: 80px;')) {
    html = html.replace('/* Ambient Background System */', spacerCSS + '\n  /* Ambient Background System */');
}

// 3. Fix the transition to ensure transform isn't overridden if we want to add any other transform later
// Make sure the cubic-bezier doesn't apply to width if it's still glitching, but let's try the transform fix first.
const superSmooth = 'transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);'; // No overshoot, just silky smooth
html = html.replace(/transition:\s*all\s*0\.5s\s*cubic-bezier\(0\.22,\s*1,\s*0\.36,\s*1\);\s*\/\*\s*Smooth,\s*non-bouncy\s*ease\s*out\s*\*\//g, superSmooth);

// Let's rewrite the scrolled block precisely to be safe
const oldScrolledCSS = `  .pu-header.scrolled {
    top: 20px !important;
    width: 85% !important;
    max-width: 1000px !important;
    border-radius: 50px !important;
    
    padding: 10px 30px !important;
    background: rgba(255, 255, 255, 0.7) !important;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 1) !important;
    border: 1px solid rgba(255, 255, 255, 0.8) !important;
  }`;

// Actually, I'll just use a regex to replace the `.pu-header.scrolled` block that has the pill properties.
const newScrolledBlock = `.pu-header.scrolled {
    top: 20px !important;
    width: 85% !important;
    max-width: 1000px !important;
    border-radius: 50px !important;
    padding: 10px 30px !important;
    background: rgba(255, 255, 255, 0.7) !important;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 1) !important;
    border: 1px solid rgba(255, 255, 255, 0.8) !important;
  }`;

html = html.replace(/\.pu-header\.scrolled\s*\{[^}]+\}/g, newScrolledBlock);

// Throttle the scroll listener to prevent jitter
const newJS = `
<script>
  let isScrolling = false;
  window.addEventListener('scroll', function() {
    if (!isScrolling) {
      window.requestAnimationFrame(function() {
        const header = document.querySelector('.pu-header');
        if (header) {
          if (window.scrollY > 50) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
        }
        isScrolling = false;
      });
      isScrolling = true;
    }
  });
</script>
</body>`;

html = html.replace(/<script>[\s\S]*?window\.addEventListener\('scroll'[\s\S]*?<\/script>\s*<\/body>/, newJS);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed jittering layout shift.');
