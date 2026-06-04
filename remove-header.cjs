const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const headerStart = html.indexOf('<header class="header" id="header">');
if (headerStart !== -1) {
    const headerEnd = html.indexOf('</header>', headerStart) + 9;
    html = html.slice(0, headerStart) + html.slice(headerEnd);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Removed full header.');
} else {
    console.log('Header not found.');
}
