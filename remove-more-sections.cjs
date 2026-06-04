const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Remove "Here is why PU hostels is where you should be" (slide-sec)
const slideStart = html.indexOf('<section class=" cmn-spacing-tb slide-sec  ">');
if (slideStart !== -1) {
    const slideEnd = html.indexOf('</section>', slideStart) + 10;
    html = html.slice(0, slideStart) + html.slice(slideEnd);
    console.log('Removed slide-sec section.');
}

// Remove "Want to live with us? Find your next home" (detail-program)
const detailStart = html.indexOf('<section class="detail-program detail-program-center cmn-spacing-tb">');
if (detailStart !== -1) {
    const detailEnd = html.indexOf('</section>', detailStart) + 10;
    html = html.slice(0, detailStart) + html.slice(detailEnd);
    console.log('Removed detail-program section.');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Done cleaning up more sections.');
