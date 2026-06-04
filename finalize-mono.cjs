const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace the base variables with Monochrome
const monoVars = `--pu-primary: #2C2C2C;
    --pu-primary-hover: #000000;
    --pu-accent: #9E9E9E;
    --pu-bg: #FFFFFF;
    --pu-dark: #111111;
    --pu-text: #1A1A1A;
    --pu-text-muted: #7A7A7A;`;

// The regex matches the block from --pu-primary: ... up to --pu-text-muted: ...
const baseVarsRegex = /--pu-primary:\s*#[a-fA-F0-9]+;[^}]*--pu-text-muted:\s*#[a-fA-F0-9]+;/;
html = html.replace(baseVarsRegex, monoVars);

// 2. Remove the .theme-mono and .theme-switcher CSS
const themeCSSRegex = /\/\* Monochrome Theme Overrides \*\/[\s\S]*?\.theme-switcher:hover\s*\{[^}]+\}/;
html = html.replace(themeCSSRegex, '');

// 3. Remove the toggle button and JS script
const jsRegex = /<button class="theme-switcher"[\s\S]*?<\/script>/;
html = html.replace(jsRegex, '');

// 4. Also update the orb background gradients to be monochrome shades
html = html.replace(/var\(--pu-primary\)\s*0%,\s*rgba\(44,95,67,0\)\s*70%/g, 'var(--pu-primary) 0%, rgba(44,44,44,0) 70%');
html = html.replace(/var\(--pu-accent\)\s*0%,\s*rgba\(196,139,100,0\)\s*70%/g, 'var(--pu-accent) 0%, rgba(158,158,158,0) 70%');
html = html.replace(/#857870\s*0%,\s*rgba\(133,120,112,0\)\s*70%/g, '#D3D3D3 0%, rgba(211,211,211,0) 70%');

// 5. Update the primary button gradient to pure monochrome
html = html.replace(/linear-gradient\(135deg,\s*var\(--pu-primary\),\s*#1F4530\)/g, 'linear-gradient(135deg, var(--pu-primary), #000000)');

// 6. Update shadows to use neutral black/grey instead of the green tint
html = html.replace(/rgba\(44,\s*95,\s*67,/g, 'rgba(0, 0, 0,');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Monochrome theme locked in permanently.');
