const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// The section we want to parse is the pu-separated-hostels
const sectionStart = html.indexOf('<section class="pu-separated-hostels"');
const sectionEnd = html.indexOf('</section>', sectionStart) + 10;

if (sectionStart === -1 || sectionEnd === -1) {
    console.log("Could not find the pu-separated-hostels section!");
    process.exit(1);
}

const sectionHTML = html.substring(sectionStart, sectionEnd);

// Helper function to extract and bundle cards
function bundleCards(htmlSubset, genderClass) {
    const cardRegex = /<div class="pu-card pu-hostel-card [^>]*>([\s\S]*?)<\/div>\s*<\/div>/g;
    let match;
    const groups = {};

    while ((match = cardRegex.exec(htmlSubset)) !== null) {
        const content = match[1];
        
        // Extract Image
        const imgMatch = content.match(/<img[^>]*src="([^"]+)"/);
        const img = imgMatch ? imgMatch[1] : '';

        // Extract Name
        const titleMatch = content.match(/<h5[^>]*>(.*?)<\/h5>/);
        const fullName = titleMatch ? titleMatch[1].trim() : 'Unknown Hostel';
        
        let baseName = fullName.split(/\s*-\s*/)[0].trim();

        // Extract Occ and Price
        const occMatch = content.match(/Occupancy\s*(.*?)</);
        const occ = occMatch ? occMatch[1].trim() : '';

        const priceDetailsMatch = content.match(/<span class="faculty-para[^>]*>([^<]*₹[^<]*)<\/span>/);
        let price = null;
        if (priceDetailsMatch) {
            const priceStr = priceDetailsMatch[1];
            const pMatch = priceStr.match(/₹\s*([0-9,]+)/);
            if (pMatch) price = parseInt(pMatch[1].replace(/,/g, ''), 10);
        }

        if (!groups[baseName]) {
            groups[baseName] = {
                image: img,
                blocks: new Set(),
                occupancies: new Set(),
                prices: []
            };
        }

        // Sometimes the block is part of the name (e.g. "Azad Bhawan - A")
        // Sometimes it's not present
        const block = fullName.split(/\s*-\s*/)[1];
        if (block) groups[baseName].blocks.add(block);

        if (occ) groups[baseName].occupancies.add(occ);
        if (price) groups[baseName].prices.push(price);
    }

    const htmlCards = [];

    for (const [name, data] of Object.entries(groups)) {
        let blockStr = data.blocks.size > 0 ? Array.from(data.blocks).join(', ') : 'Main Block';
        let occStr = data.occupancies.size > 0 ? Array.from(data.occupancies).join(', ') : 'Varies';
        
        let priceStr = 'Price not listed';
        if (data.prices.length > 0) {
            const min = Math.min(...data.prices).toLocaleString('en-IN');
            const max = Math.max(...data.prices).toLocaleString('en-IN');
            priceStr = min === max ? `₹ ${min}` : `₹ ${min} - ₹ ${max}`;
        }

        const card = `
        <div class="pu-card pu-hostel-card ${genderClass}">
            <img class="img-fluid" src="${data.image}" alt="${name}">
            <div class="faculty-details" style="padding-top: 20px;">
                <h5 class="text-title font-body-large font-weight-900 mb-2">${name}</h5>
                <p class="faculty-info-para pt-12" style="margin-bottom: 0;">
                    <span class="faculty-para font-body-normal"><strong>Blocks:</strong> ${blockStr}</span>
                    <span class="faculty-para font-body-normal"><strong>Occupancy:</strong> ${occStr}</span>
                    <span class="faculty-para font-body-normal" style="color: var(--pu-primary); font-weight: 800; font-size: 16px; margin-top: 12px;">${priceStr}</span>
                </p>
            </div>
        </div>`;
        htmlCards.push(card);
    }

    return htmlCards.join('\n');
}

// Split the section into Boys and Girls to parse them separately
const boysStart = sectionHTML.indexOf('Boys Hostels');
const girlsStart = sectionHTML.indexOf('Girls Hostels');

const boysSubset = sectionHTML.substring(boysStart, girlsStart);
const girlsSubset = sectionHTML.substring(girlsStart);

const newBoysCards = bundleCards(boysSubset, 'card-boys');
const newGirlsCards = bundleCards(girlsSubset, 'card-girls');

const newSection = `
<!-- Separated Hostel Listings -->
<section class="pu-separated-hostels" id="hostels-list" style="padding: 100px 40px; max-width: 1400px; margin: 0 auto; position: relative; z-index: 1;">
    
    <div class="hostel-group" style="margin-bottom: 80px;">
        <h2 style="font-size: 42px; font-weight: 800; color: var(--pu-text); margin-bottom: 40px; text-align: center; background: linear-gradient(135deg, #007AFF, #5AC8FA); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Boys Hostels</h2>
        <div class="pu-categories" style="padding: 0;">
            ${newBoysCards}
        </div>
    </div>

    <div class="hostel-group">
        <h2 style="font-size: 42px; font-weight: 800; color: var(--pu-text); margin-bottom: 40px; text-align: center; background: linear-gradient(135deg, #FF2D55, #FF375F); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Girls Hostels</h2>
        <div class="pu-categories" style="padding: 0;">
            ${newGirlsCards}
        </div>
    </div>

</section>
`;

html = html.substring(0, sectionStart) + newSection + html.substring(sectionEnd);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully bundled hostels into unified cards.');
