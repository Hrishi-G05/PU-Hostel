const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Add specific classes to the cards
html = html.replace('<div class="pu-card">\n    <div class="pu-card-icon">👨‍🎓</div>', '<div class="pu-card card-boys">\n    <div class="pu-card-icon">👨‍🎓</div>');
html = html.replace('<div class="pu-card">\n    <div class="pu-card-icon">👩‍🎓</div>', '<div class="pu-card card-girls">\n    <div class="pu-card-icon">👩‍🎓</div>');

// Add specific hover effects
const hoverCSS = `
  /* Specific Card Hover Effects */
  .pu-card.card-boys:hover {
    box-shadow: 0 30px 60px rgba(0, 122, 255, 0.2), inset 0 0 0 1px rgba(0, 122, 255, 0.5) !important;
  }
  .pu-card.card-boys:hover::before {
    background: linear-gradient(90deg, #007AFF, #5AC8FA);
  }
  .pu-card.card-boys:hover .pu-card-arrow {
    background: #007AFF;
    color: #fff;
  }
  .pu-card.card-boys:hover .pu-card-icon {
    filter: drop-shadow(0 0 10px rgba(0, 122, 255, 0.5));
  }

  .pu-card.card-girls:hover {
    box-shadow: 0 30px 60px rgba(255, 45, 85, 0.2), inset 0 0 0 1px rgba(255, 45, 85, 0.5) !important;
  }
  .pu-card.card-girls:hover::before {
    background: linear-gradient(90deg, #FF2D55, #FF375F);
  }
  .pu-card.card-girls:hover .pu-card-arrow {
    background: #FF2D55;
    color: #fff;
  }
  .pu-card.card-girls:hover .pu-card-icon {
    filter: drop-shadow(0 0 10px rgba(255, 45, 85, 0.5));
  }
</style>
`;

html = html.replace('</style>', hoverCSS);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Added custom blue and pink hover effects to the specific cards.');
