const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const silverCSS = `
  /* --- Premium Silver Glass Navbar --- */
  .pu-header.scrolled {
    /* Metallic frosted silver background */
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(210, 215, 220, 0.85)) !important;
    backdrop-filter: blur(24px) saturate(180%) !important;
    -webkit-backdrop-filter: blur(24px) saturate(180%) !important;
    
    /* Chrome-like bevel borders */
    border-top: 1px solid rgba(255, 255, 255, 1) !important;
    border-left: 1px solid rgba(255, 255, 255, 0.9) !important;
    border-bottom: 1px solid rgba(160, 165, 170, 0.6) !important;
    border-right: 1px solid rgba(160, 165, 170, 0.6) !important;
    
    /* Silver shadow drop */
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12), inset 0 2px 4px rgba(255, 255, 255, 1), inset 0 -2px 4px rgba(200, 205, 210, 0.5) !important;
    
    /* Container prep for shine */
    overflow: hidden !important; 
    position: fixed !important;
  }

  /* Make sure inner content stays above the shine */
  .pu-header .header-inner, 
  .pu-header .container, 
  .pu-header nav {
    position: relative;
    z-index: 5;
  }

  /* The Sweeping Silver Shine */
  .pu-header.scrolled::before {
    content: '';
    position: absolute;
    top: 0;
    left: -150%;
    width: 60%;
    height: 100%;
    /* A bright, sharp diagonal glare */
    background: linear-gradient(to right, 
        rgba(255, 255, 255, 0) 0%, 
        rgba(255, 255, 255, 0.9) 50%, 
        rgba(255, 255, 255, 0) 100%);
    transform: skewX(-30deg);
    animation: silverShineSweep 6s cubic-bezier(0.25, 1, 0.5, 1) infinite;
    z-index: 1;
    pointer-events: none;
  }

  @keyframes silverShineSweep {
    0% { left: -150%; }
    15% { left: 200%; }
    100% { left: 200%; }
  }
</style>
`;

// Inject right before the closing style tag to guarantee overrides
html = html.replace('</style>', silverCSS);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Silver glass effect applied to navbar.');
