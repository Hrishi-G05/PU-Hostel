const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const startIdx = html.indexOf('<div class="banner-left-area');
if (startIdx !== -1) {
    const endIdx = html.indexOf('</div>', startIdx + 800);
    console.log(html.substring(startIdx, endIdx + 6));
} else {
    // maybe it's just banner-area
    const start2 = html.indexOf('<div class="banner-sec');
    if (start2 !== -1) {
        console.log(html.substring(start2, start2 + 800));
    } else {
        console.log("Could not find hero section.");
    }
}
