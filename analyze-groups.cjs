const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const regex = /<h5 class="text-title[^>]*>(.*?)<\/h5>[\s\S]*?<p class="faculty-info-para[^>]*>[\s\S]*?<span[^>]*>(.*?)<\/span>[\s\S]*?<span[^>]*>(.*?)<\/span>/g;
let match;
const groups = {};

while ((match = regex.exec(html)) !== null) {
    let name = match[1].trim();
    // Example: "Azad Bhawan - A" -> "Azad Bhawan"
    // Also "Azad Bhawan-A" -> "Azad Bhawan"
    // Just split on ' - ' or '-' and take the first part
    let baseName = name.split(/\s*-\s*/)[0].trim();
    
    // Ignore the main headers we added
    if (baseName === "Boys Hostels" || baseName === "Girls Hostels" || baseName === "Premium Hostels") continue;

    const occupancy = match[2].trim();
    const priceDetails = match[3].trim(); // e.g. "Non - AC  - M - ₹ 1,07,000"
    
    // Parse price
    const priceMatch = priceDetails.match(/₹\s*([0-9,]+)/);
    const price = priceMatch ? parseInt(priceMatch[1].replace(/,/g, ''), 10) : null;
    
    // Check gender
    const isMale = priceDetails.includes('- M -') || priceDetails.includes('- CO-ED -') || html.substring(match.index - 200, match.index).includes('data-gender="m"');

    if (!groups[baseName]) {
        groups[baseName] = {
            gender: isMale ? 'Boys' : 'Girls',
            blocks: new Set(),
            prices: [],
            occupancies: new Set()
        };
    }
    
    const block = name.split(/\s*-\s*/)[1];
    if (block) groups[baseName].blocks.add(block);
    
    if (price) groups[baseName].prices.push(price);
    if (occupancy.includes('Occupancy')) {
        groups[baseName].occupancies.add(occupancy.replace('Occupancy', '').trim());
    }
}

for (const [name, data] of Object.entries(groups)) {
    let minP = Math.min(...data.prices).toLocaleString('en-IN');
    let maxP = Math.max(...data.prices).toLocaleString('en-IN');
    let priceStr = minP === maxP ? `₹${minP}` : `₹${minP} - ₹${maxP}`;
    let blocksStr = Array.from(data.blocks).join(', ');
    let occStr = Array.from(data.occupancies).join(', ');
    console.log(`[${data.gender}] ${name}: Blocks: [${blocksStr}] | Occ: [${occStr}] | Price: ${priceStr}`);
}
