const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Replace the CSS variables
const oldVars = /--pu-primary:\s*#[a-fA-F0-9]+;\s*--pu-primary-hover:\s*#[a-fA-F0-9]+;\s*--pu-accent:\s*#[a-fA-F0-9]+;\s*--pu-bg:\s*#[a-fA-F0-9]+;\s*--pu-dark:\s*#[a-fA-F0-9]+;\s*--pu-text:\s*#[a-fA-F0-9]+;\s*--pu-text-muted:\s*#[a-fA-F0-9]+;/;

const newVars = `--pu-primary: #2C5F43; /* Deep Forest Green from trees */
    --pu-primary-hover: #1F4530;
    --pu-accent: #C48B64; /* Warm Sandstone/Terracotta from the architecture */
    --pu-bg: #FAF6F0; /* Soft warm cream from the sky/clouds and light stone */
    --pu-dark: #1F2522; /* Deep Charcoal Green */
    --pu-text: #3D3530; /* Dark Earth */
    --pu-text-muted: #857870;`;

// I will use replace with string manipulation because the regex might fail due to formatting
// Instead, let's just replace the exact block:
const targetBlock = `--pu-primary: #5242D8;
    --pu-primary-hover: #4135B3;
    --pu-accent: #FF5E85;
    --pu-bg: #F4F6F9;
    --pu-dark: #0A0A10;
    --pu-text: #2D3748;
    --pu-text-muted: #718096;`;

if (html.includes(targetBlock)) {
    html = html.replace(targetBlock, newVars);
} else {
    // Fallback: replace using a more permissive regex
    html = html.replace(/--pu-primary: [^;]+;[\s\S]*?--pu-text-muted: [^;]+;/, newVars);
}

// Update the gradient buttons to match the earthy vibe. 
// A gradient from forest green to deep green looks much more organic than forest green to purple.
html = html.replace(/background:\s*linear-gradient\(135deg,\s*var\(--pu-primary\),\s*#7a00df\);/g, 'background: linear-gradient(135deg, var(--pu-primary), #1F4530);');

// Update the hero background animated gradients to match the earthy/green theme
html = html.replace(/rgba\(82,66,216,0\.15\)/g, 'rgba(44,95,67,0.15)'); // Primary (Green)
html = html.replace(/rgba\(255,94,133,0\.1\)/g, 'rgba(196,139,100,0.15)'); // Accent (Sandstone)

// Update box shadows that used the purple color rgba(82, 66, 216, ...) to use the green primary color
html = html.replace(/rgba\(82,\s*66,\s*216,/g, 'rgba(44, 95, 67,');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Color theme updated to match the organic sandstone/green campus vibe.');
