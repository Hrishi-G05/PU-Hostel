const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Reduce .pu-header padding
html = html.replace(/padding: 10px 24px;/g, 'padding: 4px 24px;');

// Reduce logo size slightly to allow smaller height
html = html.replace(/font-size: 22px;\n\s*font-weight: 800;/g, 'font-size: 18px;\n    font-weight: 800;');

// Reduce button padding
html = html.replace(/padding: 10px 24px;\n\s*border-radius: 40px;/g, 'padding: 8px 20px;\n    border-radius: 40px;');

// Reduce nav link size slightly
html = html.replace(/font-size: 14px;\n\s*text-transform: uppercase;/g, 'font-size: 12px;\n    text-transform: uppercase;');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Reduced navbar height significantly.');
