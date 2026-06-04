const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Find the section containing the old hostel layout
// We will look for <section class="detail-program detail-program-center...
// and find its end by looking for the next <section> (which is the FAQ accordion, <section class="cmn-spacing-tb accordion-main" id="faqAccordion-sec">)

const sectionStart = html.indexOf('<section class="detail-program detail-program-center');
const sectionEnd = html.indexOf('<section class="cmn-spacing-tb accordion-main" id="faqAccordion-sec">');

if (sectionStart !== -1 && sectionEnd !== -1) {
    const oldSection = html.slice(sectionStart, sectionEnd);

    // 2. Extract all hostel cards
    // A card looks like: <div class="faculty-box white-box" data-gender="m" ...> ... </div>
    const cardRegex = /<div class="faculty-box white-box" data-gender="([mf])"[\s\S]*?<\/div>\s*<\/div>/g;
    let match;
    const boysCards = [];
    const girlsCards = [];

    while ((match = cardRegex.exec(oldSection)) !== null) {
        let cardHTML = match[0];
        // Upgrade the card to glassmorphism by adding the pu-card class and removing white-box
        cardHTML = cardHTML.replace('faculty-box white-box', 'pu-card pu-hostel-card');
        
        // Upgrade the internal layout slightly for better visual
        cardHTML = cardHTML.replace('<div class="faculty-details">', '<div class="faculty-details" style="padding-top: 20px;">');
        
        if (match[1] === 'm') {
            // Apply the custom hover class for boys
            cardHTML = cardHTML.replace('pu-card', 'pu-card card-boys');
            boysCards.push(cardHTML);
        } else {
            // Apply the custom hover class for girls
            cardHTML = cardHTML.replace('pu-card', 'pu-card card-girls');
            girlsCards.push(cardHTML);
        }
    }

    console.log(`Found ${boysCards.length} Boys Hostels and ${girlsCards.length} Girls Hostels.`);

    // 3. Build the new layout
    const newLayout = `
<!-- Separated Hostel Listings -->
<section class="pu-separated-hostels" style="padding: 100px 40px; max-width: 1400px; margin: 0 auto;">
    
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

    // 4. Add CSS specifically for the images in these cards since they were built for white boxes
    const cardImgCSS = `
  .pu-hostel-card img {
    border-radius: 16px;
    width: 100%;
    height: 250px;
    object-fit: cover;
    margin-bottom: 20px;
  }
  .pu-hostel-card .faculty-details h5 {
    color: #fff !important;
  }
  .pu-hostel-card .faculty-para {
    color: #a0a0b0;
    display: block;
    margin-bottom: 8px;
    font-size: 15px;
  }
`;
    html = html.replace('</style>', cardImgCSS + '</style>');

    // 5. Replace the old section
    html = html.substring(0, sectionStart) + newLayout + html.substring(sectionEnd);
    
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Successfully separated hostels and upgraded their designs.');
} else {
    console.log('Could not find the section boundaries.');
}
