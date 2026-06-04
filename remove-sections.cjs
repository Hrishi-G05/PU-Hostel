const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove Related Links section
const relatedStart = html.indexOf('<section class="realted-links-area');
if (relatedStart !== -1) {
    const relatedEnd = html.indexOf('</section>', relatedStart) + 10;
    html = html.slice(0, relatedStart) + html.slice(relatedEnd);
    console.log('Removed "Related links" section.');
} else {
    console.log('Could not find "Related links" section.');
}

// 2. Remove "Choosing to live here" section (excellence-area)
const choosingStart = html.indexOf('<section class="excellence-area');
if (choosingStart !== -1) {
    const choosingEnd = html.indexOf('</section>', choosingStart) + 10;
    html = html.slice(0, choosingStart) + html.slice(choosingEnd);
    console.log('Removed "Choosing to live here" section.');
} else {
    console.log('Could not find "Choosing to live here" section.');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Done cleaning up sections.');
