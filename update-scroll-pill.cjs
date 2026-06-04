const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// We want to make sure the scrolled header becomes a floating pill in the center.
// We will simply append a highly specific CSS block to the end of the body to override any previous ones.
const premiumScrollCSS = `
<style>
  /* Premium Floating Pill on Scroll */
  .pu-header {
    /* ensure transition applies to everything */
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  .pu-header.scrolled {
    top: 20px !important;
    width: 85% !important;
    max-width: 1000px !important;
    border-radius: 50px !important;
    margin: 0 auto !important;
    padding: 10px 30px !important;
    background: rgba(255, 255, 255, 0.7) !important;
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 1) !important;
    border: 1px solid rgba(255, 255, 255, 0.8) !important;
  }
</style>
`;

html = html.replace('</body>', premiumScrollCSS + '\n</body>');
fs.writeFileSync('index.html', html, 'utf8');
console.log('Floating pill scroll effect added.');
