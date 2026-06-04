const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const start = html.indexOf('</main>');
const end = html.indexOf('<!-- ================= PREMIUM FOOTER ================= -->');

if (start !== -1 && end !== -1 && end > start) {
    const newHtml = html.substring(0, start + 7) + '\n\n' + html.substring(end);
    fs.writeFileSync('index.html', newHtml, 'utf8');
    console.log("Successfully removed " + (end - (start + 7)) + " bytes of garbage.");
} else {
    console.log("Could not find boundaries.");
}
