const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace the silver background with glass
html = html.replace(
  'background: linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(210, 215, 220, 0.85)) !important;',
  'background: rgba(255, 255, 255, 0.03) !important;'
);

// We should also remove the heavy bevel borders to make it pure glass
html = html.replace('border-top: 1px solid rgba(255, 255, 255, 1) !important;', 'border-top: 1px solid rgba(255, 255, 255, 0.1) !important;');
html = html.replace('border-left: 1px solid rgba(255, 255, 255, 0.9) !important;', 'border-left: 1px solid rgba(255, 255, 255, 0.1) !important;');
html = html.replace('border-bottom: 1px solid rgba(160, 165, 170, 0.6) !important;', 'border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;');
html = html.replace('border-right: 1px solid rgba(160, 165, 170, 0.6) !important;', 'border-right: 1px solid rgba(255, 255, 255, 0.05) !important;');

// Replace the heavy silver shadow
html = html.replace(
  'box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12), inset 0 2px 4px rgba(255, 255, 255, 1), inset 0 -2px 4px rgba(200, 205, 210, 0.5) !important;',
  'box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;'
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed glass CSS');
