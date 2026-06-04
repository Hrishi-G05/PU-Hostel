const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Increase width, max-width, and padding of the pill
html = html.replace(
    'width: 85% !important;\n    max-width: 1000px !important;\n    border-radius: 50px !important;\n    padding: 10px 30px !important;',
    'width: 90% !important;\n    max-width: 1200px !important;\n    border-radius: 50px !important;\n    padding: 15px 45px !important;'
);

// Reduce harsh border on scrolled pill to make it more glass-like
html = html.replace(
    'border: 1px solid rgba(255, 255, 255, 0.8) !important;',
    'border: 1px solid rgba(255, 255, 255, 0.1) !important;'
);

// Increase font sizes inside the scrolled pill
html = html.replace(
    '.pu-header.scrolled .pu-logo {\n    font-size: 18px;\n  }',
    '.pu-header.scrolled .pu-logo {\n    font-size: 24px;\n  }'
);

html = html.replace(
    '.pu-header.scrolled .pu-btn-primary {\n    padding: 8px 20px;\n    font-size: 13px;\n  }',
    '.pu-header.scrolled .pu-btn-primary {\n    padding: 12px 28px;\n    font-size: 16px;\n  }'
);

// Check if there is nav a shrinking that we need to reverse
if (!html.includes('.pu-header.scrolled .pu-nav a {')) {
    html = html.replace(
        '.pu-header.scrolled .pu-logo {',
        '.pu-header.scrolled .pu-nav a {\n    font-size: 16px;\n  }\n  .pu-header.scrolled .pu-logo {'
    );
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed pill sizing');
