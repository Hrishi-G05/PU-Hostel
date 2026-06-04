const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const startIdx = html.indexOf('<section class="infrastructure-sec">');
console.log('Start index:', startIdx);

const commentIdx = html.indexOf('<!-- Separated Hostel Listings -->');
console.log('Comment index:', commentIdx);

if (commentIdx > startIdx) {
    const endIdx = html.lastIndexOf('</section>', commentIdx) + 10;
    console.log('Calculated end index:', endIdx);
}
