const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Replace the overshooting bouncy transition with a very smooth ease-out that does NOT overshoot 
// (which prevents the width from exceeding 100% and causing horizontal scrollbar glitches).
const bouncyTransitionRegex = /transition:\s*all\s*0\.7s\s*cubic-bezier\(0\.34,\s*1\.25,\s*0\.64,\s*1\);[^\n]*/g;
const smoothTransition = 'transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1); /* Smooth, non-bouncy ease out */';

html = html.replace(bouncyTransitionRegex, smoothTransition);

// Also replace the old 0.4s one just in case it's still somewhere
html = html.replace(/transition:\s*all\s*0\.4s\s*cubic-bezier\(0\.175,\s*0\.885,\s*0\.32,\s*1\.275\);/g, smoothTransition);

// Also make sure body doesn't cause scrollbar during width transitions
if (!html.includes('overflow-x: hidden;')) {
    html = html.replace('body.wp-singular {', 'body.wp-singular {\n    overflow-x: hidden;');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed glitchy transition by removing overshoot and hiding horizontal overflow.');
