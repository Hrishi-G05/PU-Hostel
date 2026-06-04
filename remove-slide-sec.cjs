const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const slideStart = html.indexOf('<section class=" cmn-spacing-tb slide-sec  ">');
if (slideStart !== -1) {
    const slideEnd = html.indexOf('</section>', slideStart) + 10;
    html = html.slice(0, slideStart) + html.slice(slideEnd);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Removed slide-sec section.');
} else {
    console.log('Could not find slide-sec section.');
}
