const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add onclick handlers to all existing pu-hostel-card divs
// We can use a regex to match <div class="pu-card pu-hostel-card..."> and insert an onclick attribute
// But wait, the card has the title in the <h5> inside it. 
// It's easier to just do a global replace where we inject an onclick by extracting the title.
const cardRegex = /(<div class="pu-card pu-hostel-card[^>]*>[\s\S]*?<h5[^>]*>)(.*?)(<\/h5>)/g;
html = html.replace(cardRegex, (match, p1, p2, p3) => {
    // Add cursor pointer and onclick to the opening div
    let newDiv = p1.replace('<div class="pu-card', `<div class="pu-card" style="cursor: pointer;" onclick="openHostelModal('${p2}')"`);
    return newDiv + p2 + p3;
});

// 2. Inject Modal HTML
const modalHTML = `
<!-- Hostel Modal System -->
<div id="pu-hostel-modal" class="pu-modal-overlay">
    <div class="pu-modal-content">
        <div class="pu-modal-header">
            <h2 id="pu-modal-title">Hostel Name</h2>
            <button class="pu-modal-close" onclick="closeHostelModal()">&times;</button>
        </div>
        <div class="pu-modal-body" id="pu-modal-cards-container">
            <!-- Sub cards will be injected here via JS -->
        </div>
    </div>
</div>
`;

if (!html.includes('id="pu-hostel-modal"')) {
    html = html.replace('</body>', modalHTML + '\n</body>');
}

// 3. Inject Modal CSS
const modalCSS = `
  /* Modal Overlay (Glassmorphism) */
  .pu-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    z-index: 10000;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s ease;
  }
  .pu-modal-overlay.active {
    opacity: 1;
    pointer-events: all;
  }

  /* Modal Content Window */
  .pu-modal-content {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 24px;
    width: 90%;
    max-width: 1000px;
    max-height: 85vh;
    overflow-y: auto;
    box-shadow: 0 40px 80px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(255,255,255,1);
    transform: translateY(40px) scale(0.95);
    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
    padding: 40px;
    position: relative;
  }
  .pu-modal-overlay.active .pu-modal-content {
    transform: translateY(0) scale(1);
  }

  /* Modal Header */
  .pu-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
  }
  .pu-modal-header h2 {
    font-size: 32px;
    font-weight: 800;
    color: var(--pu-dark);
    margin: 0;
  }
  .pu-modal-close {
    background: #f0f0f0;
    border: none;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    font-size: 24px;
    font-weight: bold;
    color: #333;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pu-modal-close:hover {
    background: #e0e0e0;
    transform: scale(1.1);
  }

  /* Sub Cards Grid */
  #pu-modal-cards-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  .pu-sub-card {
    background: #fff;
    border-radius: 16px;
    padding: 20px;
    border: 1px solid #eaeaea;
    box-shadow: 0 10px 20px rgba(0,0,0,0.03);
    transition: all 0.3s ease;
  }
  .pu-sub-card:hover {
    box-shadow: 0 15px 30px rgba(0,0,0,0.08);
    transform: translateY(-5px);
  }
  .pu-sub-card h4 {
    font-size: 20px;
    font-weight: 700;
    color: var(--pu-dark);
    margin-bottom: 15px;
  }
  .pu-sub-card p {
    margin: 5px 0;
    color: var(--pu-text-muted);
    font-size: 14px;
  }
  .pu-sub-price {
    font-size: 18px;
    font-weight: 800;
    color: var(--pu-primary);
    margin-top: 15px !important;
  }
`;

if (!html.includes('.pu-modal-overlay')) {
    html = html.replace('</style>', modalCSS + '\n</style>');
}

// 4. Inject Modal JS and Data Map
const modalJS = `
<script>
  // Hardcoded sub-block data generation based on base names
  const hostelDataMap = {
    "Shastri Bhawan": [{ block: "A", occ: "3", price: "₹ 1,00,000" }, { block: "B", occ: "4", price: "₹ 1,05,000" }, { block: "C", occ: "3", price: "₹ 1,00,000" }],
    "Kalam Bhawan": [{ block: "A", occ: "9", price: "₹ 1,07,000" }, { block: "B", occ: "9", price: "₹ 1,07,000" }, { block: "C", occ: "9", price: "₹ 1,07,000" }],
    "Tagore Bhawan": [{ block: "A", occ: "3", price: "₹ 1,35,000" }, { block: "B", occ: "3", price: "₹ 1,35,000" }, { block: "C", occ: "3", price: "₹ 1,60,000" }],
    "Sardar Bhawan": [{ block: "A", occ: "4", price: "₹ 1,15,000" }, { block: "B", occ: "3", price: "₹ 1,40,000" }, { block: "C", occ: "3", price: "₹ 1,40,000" }],
    "Milkha Bhawan": [{ block: "A", occ: "3", price: "₹ 1,70,000" }],
    "Azad Bhawan": [{ block: "A", occ: "8", price: "₹ 1,00,000" }, { block: "B", occ: "8", price: "₹ 1,25,000" }, { block: "C", occ: "4", price: "₹ 1,45,000" }],
    "Atal Bhawan": [{ block: "A1", occ: "4", price: "₹ 1,40,000" }, { block: "A2", occ: "4", price: "₹ 1,40,000" }, { block: "B", occ: "8/10", price: "₹ 90,000" }],
    "Dhyan Bhawan": [{ block: "Main Block", occ: "3", price: "₹ 1,70,000" }, { block: "Annex", occ: "5", price: "₹ 1,15,000" }],
    "Albert Einstein": [{ block: "Main Block", occ: "2", price: "₹ 2,00,000" }, { block: "Annex", occ: "3", price: "₹ 1,60,000" }],
    "Tilak Bhawan": [{ block: "A", occ: "2", price: "₹ 1,90,000" }, { block: "B", occ: "3", price: "₹ 1,45,000" }],
    "Abraham Lincoln": [{ block: "A", occ: "5", price: "₹ 99,000" }, { block: "B", occ: "5", price: "₹ 79,000" }],
    "Ratan Tata Bhawan": [{ block: "A", occ: "3", price: "₹ 1,50,000" }, { block: "B", occ: "Double", price: "₹ 2,25,000" }],
    "Teresa Bhawan": [{ block: "A", occ: "3", price: "₹ 1,50,000" }, { block: "B", occ: "4", price: "₹ 1,20,000" }, { block: "C", occ: "3", price: "₹ 1,50,000" }, { block: "D", occ: "4", price: "₹ 1,20,000" }],
    "Shakuntala Bhawan": [{ block: "A", occ: "3", price: "₹ 1,50,000" }, { block: "B", occ: "4", price: "₹ 1,20,000" }],
    "Sarojini Bhawan": [{ block: "A", occ: "4", price: "₹ 95,000" }, { block: "B", occ: "5", price: "₹ 95,000" }, { block: "C", occ: "8", price: "₹ 95,000" }],
    "Rani Laxmibai Bhawan": [{ block: "A", occ: "5", price: "₹ 1,15,000" }, { block: "B", occ: "5", price: "₹ 1,40,000" }],
    "Kalpana Bhawan": [{ block: "A", occ: "2", price: "₹ 1,45,000" }, { block: "B", occ: "3", price: "₹ 1,15,000" }],
    "Janki Bhawan": [{ block: "Main Block", occ: "3", price: "₹ 1,70,000" }, { block: "Annex", occ: "5", price: "₹ 1,15,000" }],
    "Indira Bhawan": [{ block: "A", occ: "9", price: "₹ 1,05,000" }, { block: "B", occ: "10", price: "₹ 1,05,000" }, { block: "C", occ: "9", price: "₹ 1,05,000" }],
    "Marie Curie": [{ block: "Main Block", occ: "3", price: "₹ 1,50,000" }]
  };

  function openHostelModal(baseName) {
    const modal = document.getElementById('pu-hostel-modal');
    const title = document.getElementById('pu-modal-title');
    const container = document.getElementById('pu-modal-cards-container');
    
    title.innerText = baseName;
    container.innerHTML = ''; // Clear old

    const blocks = hostelDataMap[baseName] || [{ block: "Main Block", occ: "Varies", price: "Contact Admin" }];

    blocks.forEach(b => {
        const subCard = document.createElement('div');
        subCard.className = 'pu-sub-card';
        subCard.innerHTML = \`
            <h4>\${baseName} - \${b.block}</h4>
            <p><strong>Occupancy:</strong> \${b.occ} Sharing</p>
            <p><strong>Amenities:</strong> AC / Non-AC Available</p>
            <p class="pu-sub-price">\${b.price}</p>
        \`;
        container.appendChild(subCard);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeHostelModal() {
    const modal = document.getElementById('pu-hostel-modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Restore scrolling
  }

  // Close modal when clicking outside the content box
  document.getElementById('pu-hostel-modal').addEventListener('click', function(e) {
      if(e.target === this) closeHostelModal();
  });
</script>
`;

if (!html.includes('function openHostelModal')) {
    html = html.replace('</body>', modalJS + '\n</body>');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully injected Interactive Glass Modals for hostels.');
