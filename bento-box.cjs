const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const startIdx = html.indexOf('<section class="infrastructure-sec">');
if (startIdx === -1) {
    console.log("Could not find <section class=\"infrastructure-sec\">");
    process.exit(1);
}

const endIdx = html.indexOf('</section>', startIdx) + 10;

const icons = {
    room: '<svg class="pu-bento-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>',
    common: '<svg class="pu-bento-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>',
    fitness: '<svg class="pu-bento-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>',
    food: '<svg class="pu-bento-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-5a2 2 0 00-2-2H5a2 2 0 00-2 2v5h18z"></path></svg>',
    medical: '<svg class="pu-bento-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>',
    sports: '<svg class="pu-bento-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"></path></svg>',
    relax: '<svg class="pu-bento-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'
};

const bentoHTML = `
<section class="pu-bento-sec">
    <div class="container" style="max-width: 1400px; padding: 0 40px;">
        <h2 style="font-size: 42px; font-weight: 800; color: var(--pu-text); margin-bottom: 50px; text-align: center; background: linear-gradient(135deg, #111, #555); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Premium Facilities</h2>
        
        <div class="pu-bento-grid">
            
            <div class="pu-bento-card bento-wide">
                ${icons.room}
                <h3>Spacious furnished rooms</h3>
            </div>
            
            <div class="pu-bento-card bento-tall">
                ${icons.common}
                <h3>Interactive common areas</h3>
                <p style="margin-top: 15px; color: var(--pu-text-muted);">Collaborate and connect with peers in dynamically designed social spaces.</p>
            </div>
            
            <div class="pu-bento-card">
                ${icons.fitness}
                <h3>Premium fitness centre</h3>
            </div>
            
            <div class="pu-bento-card bento-wide">
                ${icons.food}
                <h3>Diverse food courts & Global cuisine mess</h3>
            </div>
            
            <div class="pu-bento-card">
                ${icons.relax}
                <h3>Relaxation & rejuvenation</h3>
            </div>
            
            <div class="pu-bento-card bento-wide">
                ${icons.medical}
                <h3>Advanced medical facilities</h3>
                <p style="margin-top: 15px; color: var(--pu-text-muted);">24/7 on-campus hospital and emergency care for absolute peace of mind.</p>
            </div>

            <div class="pu-bento-card bento-wide">
                ${icons.sports}
                <h3>World-class sports amenities</h3>
            </div>

        </div>
    </div>
</section>
`;

const bentoCSS = `
<style>
/* --- Bento Box UI --- */
.pu-bento-sec {
    padding: 100px 0;
    position: relative;
    z-index: 2;
}
.pu-bento-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(220px, auto);
    gap: 24px;
}
.pu-bento-card {
    background: rgba(255, 255, 255, 0.6);
    backdrop-filter: blur(30px) saturate(200%);
    -webkit-backdrop-filter: blur(30px) saturate(200%);
    border-top: 1px solid rgba(255, 255, 255, 1);
    border-left: 1px solid rgba(255, 255, 255, 0.8);
    border-right: 1px solid rgba(200, 205, 210, 0.4);
    border-bottom: 1px solid rgba(200, 205, 210, 0.4);
    border-radius: 36px;
    padding: 35px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05), inset 0 2px 5px rgba(255, 255, 255, 1);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
    cursor: pointer;
    overflow: hidden;
    position: relative;
}
.pu-bento-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1), inset 0 2px 5px rgba(255, 255, 255, 1);
    background: rgba(255, 255, 255, 0.8);
}
.pu-bento-card::after {
    content: '';
    position: absolute;
    top: 0; left: -150%; width: 50%; height: 100%;
    background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 50%, rgba(255,255,255,0) 100%);
    transform: skewX(-25deg);
    transition: left 0.7s ease;
    z-index: 1;
    pointer-events: none;
}
.pu-bento-card:hover::after {
    left: 200%;
}
.pu-bento-card h3 {
    font-size: 26px;
    font-weight: 800;
    color: var(--pu-dark);
    margin-top: auto;
    z-index: 2;
    line-height: 1.3;
}
.pu-bento-card p {
    z-index: 2;
    font-size: 16px;
    line-height: 1.5;
}
.pu-bento-icon {
    width: 54px;
    height: 54px;
    margin-bottom: 25px;
    color: var(--pu-dark);
    z-index: 2;
    filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
}
.bento-wide { grid-column: span 2; }
.bento-tall { grid-row: span 2; justify-content: flex-end; }

@media (max-width: 1024px) {
    .pu-bento-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
    .pu-bento-grid { grid-template-columns: 1fr; }
    .bento-wide, .bento-tall { grid-column: span 1; grid-row: span 1; }
}
</style>
`;

html = html.substring(0, startIdx) + bentoHTML + html.substring(endIdx);
html = html.replace('</head>', bentoCSS + '\n</head>');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Bento Box Grid injected successfully.');
