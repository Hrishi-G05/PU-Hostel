const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const scrollScript = `
<script>
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector('.pu-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Trigger once on load in case the page is already scrolled
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        }
    }
});
</script>
`;

html = html.replace('</body>', scrollScript + '\n</body>');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Scroll script injected successfully.');
