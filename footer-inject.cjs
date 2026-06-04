const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const footerHTML = `
<!-- ================= PREMIUM FOOTER ================= -->
<style>
.pu-footer {
    position: relative;
    z-index: 10;
    margin-top: 100px;
    padding-top: 80px;
    background: rgba(10, 12, 16, 0.85); /* Deep Onyx Glass */
    backdrop-filter: blur(40px) saturate(180%);
    -webkit-backdrop-filter: blur(40px) saturate(180%);
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.6);
    box-shadow: 0 -20px 50px rgba(0,0,0,0.3);
}
/* Glowing top edge */
.pu-footer::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 1px;
    background: linear-gradient(90deg, transparent, var(--pu-primary), transparent);
    opacity: 0.7;
}
.pu-footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.5fr;
    gap: 50px;
    padding-bottom: 60px;
    max-width: 1400px;
    margin: 0 auto;
    padding-left: 40px;
    padding-right: 40px;
}
.pu-footer-col h3.pu-footer-brand {
    font-size: 32px;
    font-weight: 900;
    color: #fff;
    margin-bottom: 20px;
    background: linear-gradient(135deg, #fff, #999);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    display: inline-block;
}
.pu-footer-col h4 {
    font-size: 18px;
    color: #fff;
    font-weight: 600;
    margin-bottom: 25px;
    letter-spacing: 0.5px;
}
.pu-footer-col p {
    font-size: 15px;
    line-height: 1.7;
    margin-bottom: 25px;
    max-width: 350px;
}
.pu-footer-col a.pu-footer-link {
    display: block;
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    margin-bottom: 15px;
    font-size: 15px;
    transition: color 0.3s ease;
    width: fit-content;
}
.pu-footer-col a.pu-footer-link:hover {
    color: #fff;
    text-shadow: 0 0 10px rgba(255,255,255,0.3);
}
.pu-footer-socials {
    display: flex;
    gap: 15px;
}
.pu-footer-socials a {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-weight: 600;
    font-size: 16px;
    text-decoration: none;
    transition: all 0.3s ease;
}
.pu-footer-socials a:hover {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}
.pu-footer-input-group {
    display: flex;
    gap: 10px;
}
.pu-footer-input-group input {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 14px 20px;
    border-radius: 30px;
    color: #fff;
    outline: none;
    flex-grow: 1;
    font-family: inherit;
    transition: all 0.3s ease;
}
.pu-footer-input-group input::placeholder {
    color: rgba(255,255,255,0.4);
}
.pu-footer-input-group input:focus {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.3);
    box-shadow: inset 0 0 10px rgba(255,255,255,0.05);
}
.pu-footer-input-group button {
    background: linear-gradient(135deg, var(--pu-primary), var(--pu-accent));
    border: 1px solid rgba(255,255,255,0.2);
    padding: 14px 28px;
    border-radius: 30px;
    color: #fff;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    box-shadow: 0 10px 20px rgba(0,0,0,0.2), inset 0 1px 1px rgba(255,255,255,0.5);
    transition: all 0.3s ease;
}
.pu-footer-input-group button:hover {
    box-shadow: 0 15px 25px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.8);
    filter: brightness(1.1);
}
.pu-footer-bottom {
    text-align: center;
    padding: 30px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    font-size: 14px;
    color: rgba(255, 255, 255, 0.4);
}

@media (max-width: 1024px) {
    .pu-footer-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 600px) {
    .pu-footer-grid { grid-template-columns: 1fr; }
    .pu-footer-input-group { flex-direction: column; }
}
</style>

<footer class="pu-footer">
  <div class="pu-footer-grid">
    <div class="pu-footer-col pu-reveal">
      <h3 class="pu-footer-brand pu-magnetic">PU Hostel</h3>
      <p>Experience the most premium, secure, and vibrant campus living environment designed specifically for your holistic growth.</p>
      <div class="pu-footer-socials">
        <a href="#" class="pu-magnetic">FB</a>
        <a href="#" class="pu-magnetic">IG</a>
        <a href="#" class="pu-magnetic">X</a>
      </div>
    </div>
    
    <div class="pu-footer-col pu-reveal">
      <h4>Quick Links</h4>
      <a href="#" class="pu-footer-link pu-magnetic">Home</a>
      <a href="#" class="pu-footer-link pu-magnetic">Explore Hostels</a>
      <a href="#" class="pu-footer-link pu-magnetic">Premium Facilities</a>
      <a href="#" class="pu-footer-link pu-magnetic">Campus Life</a>
    </div>

    <div class="pu-footer-col pu-reveal">
      <h4>Support & Legal</h4>
      <a href="#" class="pu-footer-link pu-magnetic">Contact Us</a>
      <a href="#" class="pu-footer-link pu-magnetic">FAQ & Rules</a>
      <a href="#" class="pu-footer-link pu-magnetic">Privacy Policy</a>
      <a href="#" class="pu-footer-link pu-magnetic">Terms of Service</a>
    </div>

    <div class="pu-footer-col pu-reveal">
      <h4>Stay Updated</h4>
      <p>Subscribe to our newsletter for the latest campus events and updates.</p>
      <div class="pu-footer-input-group">
        <input type="email" placeholder="Enter your email" />
        <button class="pu-magnetic">Subscribe</button>
      </div>
    </div>
  </div>
  <div class="pu-footer-bottom pu-reveal">
    <p>&copy; 2026 Parul University. All rights reserved.</p>
  </div>
</footer>
<!-- ==================================================== -->
`;

const targetAnchor = '<!-- ================= ADVANCED UI INJECTIONS ================= -->';

if (html.includes(targetAnchor)) {
    html = html.replace(targetAnchor, footerHTML + '\n' + targetAnchor);
} else {
    html = html.replace('</main>', '</main>\n' + footerHTML);
}

// Ensure the new footer elements are targeted by the IntersectionObserver 
// The observer already targets '.pu-reveal' manually in my previous script? 
// No, the previous script queried '.pu-bento-card, .pu-hostel-card, .hostel-group h2, .pu-categories h2'
// I need to update the IntersectionObserver to also observe the new '.pu-footer-col' and '.pu-footer-bottom'.

// To fix this quickly without writing complex regex, I can just append another script that observers .pu-reveal elements!
// Wait, in my previous script, I actually added .pu-reveal to the queried elements, and then observed them.
// Now, the footer elements already have .pu-reveal in their HTML. I just need to observe them.

const observerUpdateHTML = `
<script>
document.addEventListener("DOMContentLoaded", () => {
    const existingObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('pu-reveal-active');
                }, (index % 10) * 100);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    // Grab the new footer elements that already have pu-reveal
    document.querySelectorAll('.pu-footer .pu-reveal').forEach(el => existingObserver.observe(el));

    // Also attach the magnetic hover to the new magnetic elements
    document.querySelectorAll('.pu-footer .pu-magnetic').forEach(magnet => {
        magnet.addEventListener('mousemove', (e) => {
            magnet.classList.add('hovering');
            const rect = magnet.getBoundingClientRect();
            const h = rect.width / 2;
            const v = rect.height / 2;
            const x = e.clientX - rect.left - h;
            const y = e.clientY - rect.top - v;
            magnet.style.transform = \\\`translate(\\\${x * 0.3}px, \\\${y * 0.3}px)\\\`;
        });
        magnet.addEventListener('mouseleave', () => {
            magnet.classList.remove('hovering');
            magnet.style.transform = 'translate(0px, 0px)';
        });
    });
});
</script>
`;

html = html.replace('</body>', observerUpdateHTML + '\n</body>');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Premium footer injected successfully.');
