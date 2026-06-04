const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const advancedUIHTML = `
<!-- ================= ADVANCED UI INJECTIONS ================= -->
<style>
/* 1. Custom Sleek Scrollbar */
::-webkit-scrollbar {
    width: 10px;
    height: 10px;
}
::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(10px);
}
::-webkit-scrollbar-thumb {
    background: rgba(180, 185, 190, 0.7);
    border-radius: 10px;
    border: 2px solid rgba(255, 255, 255, 0.6);
}
::-webkit-scrollbar-thumb:hover {
    background: rgba(140, 145, 150, 0.9);
}

/* 2. Scroll Reveal Animations */
.pu-reveal {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    will-change: opacity, transform;
}
.pu-reveal.pu-reveal-active {
    opacity: 1;
    transform: translateY(0);
}

/* 3. Magnetic Hover Engine */
.pu-magnetic {
    display: inline-block;
    transition: transform 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    will-change: transform;
}
.pu-magnetic.hovering {
    transition: transform 0.05s linear; /* Snap quickly while following mouse */
}
</style>

<script>
document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Scroll-Reveal Engine (Intersection Observer) ---
    const revealTargets = document.querySelectorAll('.pu-bento-card, .pu-hostel-card, .hostel-group h2, .pu-categories h2');
    revealTargets.forEach(el => el.classList.add('pu-reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Staggered reveal based on DOM order index
                setTimeout(() => {
                    entry.target.classList.add('pu-reveal-active');
                }, (index % 10) * 100); // max delay 1000ms
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    revealTargets.forEach(el => observer.observe(el));


    // --- 2. Magnetic Hover Physics ---
    const magnets = document.querySelectorAll('.nav-item a, .pu-btn, .pu-logo');
    magnets.forEach(magnet => {
        magnet.classList.add('pu-magnetic');
        
        magnet.addEventListener('mousemove', (e) => {
            magnet.classList.add('hovering');
            const rect = magnet.getBoundingClientRect();
            // Get center coordinates of the element
            const h = rect.width / 2;
            const v = rect.height / 2;
            
            // Get mouse position relative to center
            const x = e.clientX - rect.left - h;
            const y = e.clientY - rect.top - v;
            
            // Move element 30% of the distance towards the mouse
            magnet.style.transform = \`translate(\${x * 0.3}px, \${y * 0.3}px)\`;
        });

        magnet.addEventListener('mouseleave', () => {
            magnet.classList.remove('hovering');
            // Snap back to origin
            magnet.style.transform = 'translate(0px, 0px)';
        });
    });


    // --- 3. Hero Section Parallax Typography ---
    // Try to find the hero section or default to body
    const heroSection = document.querySelector('.banner-sec, .banner-area') || document.body;
    // Try to find the massive text elements in the hero
    const heroTitles = document.querySelectorAll('.banner-left-area h1, .banner-left-area h2, .banner-title');
    
    heroTitles.forEach(heroTitle => {
        heroTitle.style.transition = 'transform 0.1s linear, text-shadow 0.1s linear';
        heroTitle.style.transformStyle = 'preserve-3d';
        
        heroSection.addEventListener('mousemove', (e) => {
            // Calculate mouse distance from center of window
            const xAxis = (window.innerWidth / 2 - e.pageX) / 50; 
            const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
            
            // Rotate the text slightly to face the cursor
            heroTitle.style.transform = \`perspective(1000px) rotateY(\${xAxis}deg) rotateX(\${yAxis}deg)\`;
            
            // Cast a dynamic shadow in the opposite direction of the tilt
            heroTitle.style.textShadow = \`\${-xAxis * 2}px \${-yAxis * 2}px 15px rgba(0,0,0,0.15)\`;
        });
        
        heroSection.addEventListener('mouseleave', () => {
            heroTitle.style.transition = 'transform 0.5s ease, text-shadow 0.5s ease';
            heroTitle.style.transform = \`perspective(1000px) rotateY(0deg) rotateX(0deg)\`;
            heroTitle.style.textShadow = 'none';
        });
        
        heroSection.addEventListener('mouseenter', () => {
            heroTitle.style.transition = 'transform 0.1s linear, text-shadow 0.1s linear';
        });
    });

});
</script>
<!-- ========================================================== -->
`;

if (!html.includes('ADVANCED UI INJECTIONS')) {
    html = html.replace('</body>', advancedUIHTML + '\n</body>');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Advanced UI scripts and CSS injected successfully.');
