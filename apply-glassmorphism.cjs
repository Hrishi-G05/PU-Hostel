const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Inject Ambient Background HTML
const ambientHTML = `
<!-- Site-Wide Glassmorphism Ambient Background -->
<div class="pu-ambient-bg">
  <div class="orb orb-1"></div>
  <div class="orb orb-2"></div>
  <div class="orb orb-3"></div>
</div>
`;

html = html.replace('<body>', '<body>\n' + ambientHTML);

// 2. Inject CSS for ambient bg, transparent bodies, and ultimate glass cards
const glassCSS = `
  /* Ambient Background System */
  .pu-ambient-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -999;
    background-color: var(--pu-bg);
    overflow: hidden;
  }
  
  .orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(100px);
    opacity: 0.6;
    animation: floatOrbs 20s infinite alternate ease-in-out;
  }
  
  .orb-1 {
    width: 60vw;
    height: 60vw;
    background: radial-gradient(circle, var(--pu-primary) 0%, rgba(44,95,67,0) 70%);
    top: -20%;
    left: -10%;
    animation-duration: 25s;
  }
  
  .orb-2 {
    width: 50vw;
    height: 50vw;
    background: radial-gradient(circle, var(--pu-accent) 0%, rgba(196,139,100,0) 70%);
    bottom: -10%;
    right: -10%;
    animation-delay: -5s;
  }
  
  .orb-3 {
    width: 40vw;
    height: 40vw;
    background: radial-gradient(circle, #857870 0%, rgba(133,120,112,0) 70%);
    top: 40%;
    left: 40%;
    animation-duration: 30s;
    animation-direction: alternate-reverse;
  }
  
  @keyframes floatOrbs {
    0% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(5vw, -5vh) scale(1.1); }
    66% { transform: translate(-3vw, 8vh) scale(0.9); }
    100% { transform: translate(2vw, -2vh) scale(1.05); }
  }

  /* Force transparent backgrounds for main wrappers so glass shows through */
  body, .main-content, .page-wrapper, .site-main, .container, section {
    background: transparent !important;
    background-color: transparent !important;
  }

  /* Upgrade Cards to True Glassmorphism */
  .pu-card {
    background: rgba(255, 255, 255, 0.4) !important;
    backdrop-filter: blur(30px) saturate(180%) !important;
    -webkit-backdrop-filter: blur(30px) saturate(180%) !important;
    border: 1px solid rgba(255, 255, 255, 0.6) !important;
    border-top: 1px solid rgba(255, 255, 255, 0.8) !important;
    border-left: 1px solid rgba(255, 255, 255, 0.8) !important;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.3) !important;
  }
  
  .pu-card:hover {
    background: rgba(255, 255, 255, 0.5) !important;
    box-shadow: 0 30px 60px rgba(44, 95, 67, 0.1), inset 0 0 0 1px rgba(255, 255, 255, 0.5) !important;
  }

  /* Remove the old static hero background orbs to prevent clutter */
  .pu-hero::before, .pu-hero::after {
    display: none !important;
  }
</style>
`;

html = html.replace('</style>', glassCSS);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Site-wide glassmorphism applied.');
