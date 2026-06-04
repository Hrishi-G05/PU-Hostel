const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Replace all href links pointing to Parul University with #
// This regex handles href="https://www.paruluniversity.ac.in..." and href='...'
const hrefRegex = /href\s*=\s*["']https?:\/\/(?:www\.)?paruluniversity\.ac\.in[^"']*["']/gi;
html = html.replace(hrefRegex, 'href="#"');

// Also replace any form actions pointing to Parul
const actionRegex = /action\s*=\s*["']https?:\/\/(?:www\.)?paruluniversity\.ac\.in[^"']*["']/gi;
html = html.replace(actionRegex, 'action="#"');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully removed all outbound connections to the original site.');
