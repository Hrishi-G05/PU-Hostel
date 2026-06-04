const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const relatedStart = html.indexOf('<section class="realted-links-area');
if (relatedStart !== -1) {
    const relatedEnd = html.indexOf('</section>', relatedStart) + 10;
    html = html.slice(0, relatedStart) + html.slice(relatedEnd);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Removed "Related links" section.');
} else {
    console.log('Could not find "Related links" section.');
}
