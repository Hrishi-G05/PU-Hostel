const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace current CSS variables with Sunset Glow
const sunsetVars = `--pu-primary: #FF6B6B; /* Vibrant Coral */
    --pu-primary-hover: #EE5A5A;
    --pu-accent: #845EC2; /* Deep Violet */
    --pu-bg: #FFF5EE; /* Warm Peach */
    --pu-dark: #2D2224;
    --pu-text: #2D2224;
    --pu-text-muted: #8E7C80;`;

// The old vars to replace (the green earthy ones)
const oldVarsRegex = /--pu-primary:\s*#[a-fA-F0-9]+;[^}]*--pu-text-muted:\s*#[a-fA-F0-9]+;/;
html = html.replace(oldVarsRegex, sunsetVars);

// 2. Add Monochrome CSS class overrides
const monoCSS = `
  /* Monochrome Theme Overrides */
  body.theme-mono {
    --pu-primary: #2C2C2C;
    --pu-primary-hover: #000000;
    --pu-accent: #9E9E9E;
    --pu-bg: #FFFFFF;
    --pu-dark: #111111;
    --pu-text: #1A1A1A;
    --pu-text-muted: #7A7A7A;
  }
  
  /* Theme Switcher Button */
  .theme-switcher {
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index: 9999;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(0,0,0,0.1);
    padding: 12px 24px;
    border-radius: 30px;
    font-family: 'Outfit', sans-serif;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
  }
  .theme-switcher:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 25px rgba(0,0,0,0.15);
  }
</style>`;

html = html.replace('</style>', monoCSS);

// 3. Add the JS and HTML for the switcher
const switcherJS = `
<button class="theme-switcher" onclick="toggleTheme()">Switch to Monochrome Theme</button>
<script>
  function toggleTheme() {
    const body = document.body;
    const btn = document.querySelector('.theme-switcher');
    body.classList.toggle('theme-mono');
    if (body.classList.contains('theme-mono')) {
      btn.innerText = "Switch to Sunset Theme";
    } else {
      btn.innerText = "Switch to Monochrome Theme";
    }
  }
</script>
</body>`;

html = html.replace('</body>', switcherJS);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Themes applied and switcher injected.');
