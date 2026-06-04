const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const boysData = [
    { name: "Shastri Bhawan", blocks: "A, B, C", occ: "3, 4", price: "₹ 1,00,000 - ₹ 1,05,000" },
    { name: "Kalam Bhawan", blocks: "A, B, C", occ: "9", price: "₹ 1,07,000" },
    { name: "Tagore Bhawan", blocks: "A, B, C", occ: "3", price: "₹ 1,30,000 - ₹ 1,60,000" },
    { name: "Sardar Bhawan", blocks: "A, B, C", occ: "4, 3", price: "₹ 1,15,000 - ₹ 1,40,000" },
    { name: "Milkha Bhawan", blocks: "A", occ: "3", price: "₹ 1,40,000 - ₹ 1,70,000" },
    { name: "Azad Bhawan", blocks: "A", occ: "8", price: "₹ 1,00,000 - ₹ 1,25,000" },
    { name: "Atal Bhawan", blocks: "A1, A2, B", occ: "4, 8/10", price: "₹ 90,000 - ₹ 1,40,000" },
    { name: "Dhyan Bhawan", blocks: "Main Block", occ: "3, 5", price: "₹ 1,15,000 - ₹ 1,70,000" },
    { name: "Albert Einstein", blocks: "Main Block", occ: "2, 3", price: "Price varies" },
    { name: "Tilak Bhawan", blocks: "A", occ: "2, 3", price: "₹ 1,45,000 - ₹ 1,90,000" },
    { name: "Abraham Lincoln", blocks: "A, B", occ: "5", price: "₹ 79,000 - ₹ 99,000" },
    { name: "Ratan Tata Bhawan", blocks: "A, B", occ: "Double, 3", price: "₹ 1,50,000 - ₹ 2,25,000" }
];

const girlsData = [
    { name: "Teresa Bhawan", blocks: "A, B, C, D", occ: "3, 4", price: "₹ 1,20,000 - ₹ 1,50,000" },
    { name: "Shakuntala Bhawan", blocks: "A, B", occ: "3, 4", price: "₹ 1,20,000 - ₹ 1,50,000" },
    { name: "Sarojini Bhawan", blocks: "A, B, C", occ: "4, 5, 8", price: "₹ 95,000" },
    { name: "Rani Laxmibai Bhawan", blocks: "A, B", occ: "5", price: "₹ 1,15,000 - ₹ 1,40,000" },
    { name: "Kalpana Bhawan", blocks: "A, B", occ: "2/3", price: "₹ 1,15,000 - ₹ 1,45,000" },
    { name: "Janki Bhawan", blocks: "Main Block", occ: "3, 5", price: "₹ 1,15,000 - ₹ 1,70,000" },
    { name: "Indira Bhawan", blocks: "A, B, C", occ: "9, 10", price: "₹ 1,05,000" },
    { name: "Marie Curie", blocks: "Main Block", occ: "3", price: "Price varies" }
];

function generateCard(hostel, imgIndex, isBoys) {
    const cls = isBoys ? 'card-boys' : 'card-girls';
    const imgId = (imgIndex % 9) + 1; // loop through 1-9
    return `
        <div class="pu-card pu-hostel-card ${cls}">
            <img class="img-fluid" src="images/hostel-img-${imgId}.webp" alt="${hostel.name}">
            <div class="faculty-details" style="padding-top: 20px;">
                <h5 class="text-title font-body-large font-weight-900 mb-2" style="color: var(--pu-text);">${hostel.name}</h5>
                <p class="faculty-info-para pt-12" style="margin-bottom: 0;">
                    <span class="faculty-para font-body-normal" style="color: var(--pu-text-muted);"><strong>Blocks:</strong> ${hostel.blocks}</span>
                    <span class="faculty-para font-body-normal" style="color: var(--pu-text-muted);"><strong>Occupancy:</strong> ${hostel.occ}</span>
                    <span class="faculty-para font-body-normal" style="color: var(--pu-primary); font-weight: 800; font-size: 16px; margin-top: 12px;">${hostel.price}</span>
                </p>
            </div>
        </div>`;
}

let boysHTML = '';
boysData.forEach((h, i) => boysHTML += generateCard(h, i, true));

let girlsHTML = '';
girlsData.forEach((h, i) => girlsHTML += generateCard(h, i, false));

const sectionStart = html.indexOf('<section class="pu-separated-hostels"');
const sectionEnd = html.indexOf('</section>', sectionStart) + 10;

const newSection = `
<!-- Separated Hostel Listings -->
<section class="pu-separated-hostels" id="hostels-list" style="padding: 100px 40px; max-width: 1400px; margin: 0 auto; position: relative; z-index: 1;">
    
    <div class="hostel-group" style="margin-bottom: 80px;">
        <h2 style="font-size: 42px; font-weight: 800; margin-bottom: 40px; text-align: center; background: linear-gradient(135deg, #007AFF, #5AC8FA); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Boys Hostels</h2>
        <div class="pu-categories" style="padding: 0;">
            ${boysHTML}
        </div>
    </div>

    <div class="hostel-group">
        <h2 style="font-size: 42px; font-weight: 800; margin-bottom: 40px; text-align: center; background: linear-gradient(135deg, #FF2D55, #FF375F); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Girls Hostels</h2>
        <div class="pu-categories" style="padding: 0;">
            ${girlsHTML}
        </div>
    </div>

</section>
`;

html = html.substring(0, sectionStart) + newSection + html.substring(sectionEnd);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully recovered and generated the unified hostel cards.');
