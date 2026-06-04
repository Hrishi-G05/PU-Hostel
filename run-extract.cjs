const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// The section containing the original hostel grid starts with <section class="detail-program detail-program-center...
// But wait, my previous script had a typo or couldn't find the exact class string because maybe it has extra spaces.
// Let's find the start of the `<div class="container pb-60">` which wraps the filter area, or `<div class="faculty-main-wrapper">`.

const startMatch = html.match(/<section class="detail-program detail-program-center[^>]*>/);
const accordionMatch = html.match(/<section class="cmn-spacing-tb accordion-main"/);

if (startMatch && accordionMatch) {
    const startIndex = startMatch.index;
    const endIndex = accordionMatch.index;
    
    const oldSection = html.slice(startIndex, endIndex);

    const cardRegex = /<div class="faculty-box white-box" data-gender="([mf])"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g;
    let match;
    const boysCards = [];
    const girlsCards = [];

    while ((match = cardRegex.exec(oldSection)) !== null) {
        let cardHTML = match[0];
        
        cardHTML = cardHTML.replace('faculty-box white-box', 'pu-card pu-hostel-card');
        cardHTML = cardHTML.replace('<div class="faculty-details">', '<div class="faculty-details" style="padding-top: 20px;">');
        
        if (match[1] === 'm') {
            cardHTML = cardHTML.replace('pu-card', 'pu-card card-boys');
            boysCards.push(cardHTML);
        } else {
            cardHTML = cardHTML.replace('pu-card', 'pu-card card-girls');
            girlsCards.push(cardHTML);
        }
    }

    console.log(`Extracted ${boysCards.length} Boys Hostels and ${girlsCards.length} Girls Hostels.`);

    const newLayout = `
<!-- Separated Hostel Listings -->
<section class="pu-separated-hostels" id="hostels-list" style="padding: 100px 40px; max-width: 1400px; margin: 0 auto; position: relative; z-index: 1;">
    
    <div class="hostel-group" style="margin-bottom: 80px;">
        <h2 style="font-size: 42px; font-weight: 800; color: #fff; margin-bottom: 40px; text-align: center; background: linear-gradient(135deg, #007AFF, #5AC8FA); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Boys Hostels</h2>
        <div class="pu-categories" style="padding: 0;">
            ${boysCards.join('\n')}
        </div>
    </div>

    <div class="hostel-group">
        <h2 style="font-size: 42px; font-weight: 800; color: #fff; margin-bottom: 40px; text-align: center; background: linear-gradient(135deg, #FF2D55, #FF375F); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Girls Hostels</h2>
        <div class="pu-categories" style="padding: 0;">
            ${girlsCards.join('\n')}
        </div>
    </div>

</section>
`;

    const cardImgCSS = `
  .pu-hostel-card img {
    border-radius: 16px;
    width: 100%;
    height: 250px;
    object-fit: cover;
    margin-bottom: 20px;
  }
  .pu-hostel-card .faculty-details h5 {
    color: var(--pu-text) !important;
  }
  .pu-hostel-card .faculty-para {
    color: var(--pu-text-muted);
    display: block;
    margin-bottom: 8px;
    font-size: 15px;
    font-weight: 600;
  }
  /* Remove the pseudo-arrow from these cards as they don't have the arrow div */
  .pu-hostel-card:hover .pu-card-arrow {
    background: transparent;
  }
`;
    html = html.replace('</style>', cardImgCSS + '</style>');

    html = html.substring(0, startIndex) + newLayout + html.substring(endIndex);
    
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Successfully separated hostels into Boys and Girls grids.');
} else {
    console.log('Could not find the start or end markers. Printing nearby lines for debugging:');
    const lines = html.split('\n');
    lines.forEach((line, i) => {
        if (line.includes('detail-program')) console.log(i, line);
        if (line.includes('accordion-main')) console.log(i, line);
    });
}
