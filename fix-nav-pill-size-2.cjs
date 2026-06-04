const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Increase width, max-width, and padding of the pill
html = html.replace(
    'width: 90% !important;\n    max-width: 1200px !important;\n    border-radius: 50px !important;\n    padding: 15px 45px !important;',
    'width: 95% !important;\n    max-width: 1400px !important;\n    border-radius: 60px !important;\n    padding: 22px 60px !important;'
);

// Increase font sizes inside the scrolled pill
html = html.replace(
    '.pu-header.scrolled .pu-logo {\n    font-size: 24px;\n  }',
    '.pu-header.scrolled .pu-logo {\n    font-size: 32px;\n  }'
);

html = html.replace(
    '.pu-header.scrolled .pu-btn-primary {\n    padding: 12px 28px;\n    font-size: 16px;\n  }',
    '.pu-header.scrolled .pu-btn-primary {\n    padding: 16px 36px;\n    font-size: 18px;\n  }'
);

if (html.includes('.pu-header.scrolled .pu-nav a {\n    font-size: 16px;\n  }')) {
    html = html.replace(
        '.pu-header.scrolled .pu-nav a {\n    font-size: 16px;\n  }',
        '.pu-header.scrolled .pu-nav a {\n    font-size: 18px;\n    margin: 0 20px;\n  }'
    );
} else {
    html = html.replace(
        '.pu-header.scrolled .pu-logo {',
        '.pu-header.scrolled .pu-nav a {\n    font-size: 18px;\n    margin: 0 20px;\n  }\n  .pu-header.scrolled .pu-logo {'
    );
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Fixed pill sizing again');
