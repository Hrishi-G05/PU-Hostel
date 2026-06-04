const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const choosingStart = html.indexOf('<section class="excellence-area');
if (choosingStart !== -1) {
    const choosingEnd = html.indexOf('</section>', choosingStart) + 10;
    html = html.slice(0, choosingStart) + html.slice(choosingEnd);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Removed "Choosing to live here" section.');
} else {
    console.log('Could not find "Choosing to live here" section.');
}
