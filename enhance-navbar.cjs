const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Find the .pu-header CSS rule and replace it
const targetRegex = /\.pu-header\s*\{[^}]+\}/;
const newHeaderCSS = `.pu-header {
    position: sticky;
    top: 20px;
    margin: 0 auto;
    width: 90%;
    max-width: 1400px;
    z-index: 1000;
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    background: rgba(255, 255, 255, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 40px;
    padding: 15px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 10px 40px rgba(82, 66, 216, 0.1), inset 0 0 10px rgba(255, 255, 255, 0.8);
    transition: all 0.3s ease;
  }`;

html = html.replace(targetRegex, newHeaderCSS);
fs.writeFileSync('index.html', html, 'utf8');
console.log('Enhanced glassmorphism in navbar!');
