const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const startIdx = html.indexOf('<section class="infrastructure-sec">');
console.log('Start index:', startIdx);

const nextStartIdx = html.indexOf('<section class="pu-separated-hostels"');
console.log('Next section start index:', nextStartIdx);

let endIdx = -1;
if (nextStartIdx > startIdx) {
    // Find the nearest </section> right before nextStartIdx
    endIdx = html.lastIndexOf('</section>', nextStartIdx);
}

console.log('Calculated end index:', endIdx);
