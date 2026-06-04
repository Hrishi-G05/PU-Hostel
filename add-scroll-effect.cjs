const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Add the CSS for .scrolled state
const cssToInject = `
  /* Dynamic Scroll State */
  .pu-header.scrolled {
    padding: 6px 40px !important;
    background: rgba(255, 255, 255, 0.85);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);
  }
  .pu-header.scrolled .pu-logo {
    font-size: 18px;
  }
  .pu-header.scrolled .pu-btn-primary {
    padding: 8px 20px;
    font-size: 13px;
  }
</style>`;

if (html.includes('</style>')) {
    html = html.replace('</style>', cssToInject);
}

// Add the JavaScript for scroll event
const jsToInject = `
<script>
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.pu-header');
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }
  });
</script>
</body>`;

if (html.includes('</body>')) {
    html = html.replace('</body>', jsToInject);
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Scroll effect added successfully.');
