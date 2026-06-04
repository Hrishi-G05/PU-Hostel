const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const sectionStart = html.indexOf('<section class="pu-separated-hostels"');
console.log(html.substring(sectionStart, sectionStart + 800));
