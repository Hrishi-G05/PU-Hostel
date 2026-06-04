const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const bannerStart = html.indexOf('<section class="banner-sec"');
if (bannerStart !== -1) {
    const bannerEnd = html.indexOf('</section>', bannerStart) + 10;
    html = html.slice(0, bannerStart) + html.slice(bannerEnd);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Removed full banner section.');
} else {
    console.log('Banner not found.');
}
