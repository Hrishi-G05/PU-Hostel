const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const startIdx = html.indexOf('<section class="infrastructure-sec">');
if (startIdx === -1) {
    console.log("Could not find <section class=\"infrastructure-sec\">");
    process.exit(1);
}

const endIdx = html.indexOf('</section>', startIdx) + 10;

console.log("Start:", startIdx, "End:", endIdx);
console.log("Section length to replace:", endIdx - startIdx);
