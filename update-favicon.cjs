const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Change the Title
// We previously set it to "<title>PU Hostel | The Ultimate Living Experience</title>"
html = html.replace(/<title>.*?<\/title>/g, '<title>localhost</title>');

// 2. Change the Favicon
// We need to replace any existing link rel="icon" or rel="shortcut icon"
const iconRegex = /<link[^>]*rel="([^"]*icon[^"]*)"[^>]*>/gi;
html = html.replace(iconRegex, '');

// Create a sleek "Localhost" SVG favicon (a terminal prompt ">_")
const svgFavicon = `
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
  <rect width='100' height='100' rx='20' fill='%231A1A1A'/>
  <path d='M25 30 L45 50 L25 70' stroke='%23FFFFFF' stroke-width='8' fill='none' stroke-linecap='round' stroke-linejoin='round'/>
  <rect x='55' y='65' width='25' height='8' fill='%23FFFFFF'/>
</svg>">
`;

// Inject the new favicon right under the <title>
html = html.replace('<title>localhost</title>', '<title>localhost</title>\n' + svgFavicon);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Title and favicon updated to localhost.');
