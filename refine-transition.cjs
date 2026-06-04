const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Replace the old transition
const oldTransition = 'transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);';
const newTransition = 'transition: all 0.7s cubic-bezier(0.34, 1.25, 0.64, 1); /* Ultra smooth spring transition */';

html = html.replace(oldTransition, newTransition);

// If the transition is in the first custom style block we might also need to replace the inline one if we injected multiple.
// Let's use a regex to replace ALL `.pu-header { ... transition: ... }` transitions just to be safe.
html = html.replace(/transition:\s*all\s*0\.3s\s*ease;/g, newTransition); // The original simple one

fs.writeFileSync('index.html', html, 'utf8');
console.log('Transition improved.');
