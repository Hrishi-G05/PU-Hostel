const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Update Title
html = html.replace(/<title>.*?<\/title>/, '<title>PU Hostel | The Ultimate Living Experience</title>');

// 2. Premium CSS (Glassmorphism, Animations, Fonts)
const premiumCSS = `
<!-- PU Hostel Custom Styles -->
<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;800&display=swap" rel="stylesheet">
<style>
  :root {
    --pu-primary: #5242D8;
    --pu-primary-hover: #4135B3;
    --pu-accent: #FF5E85;
    --pu-dark: #0A0A10;
    --pu-text: #E0E0E6;
    --pu-glass-bg: rgba(255, 255, 255, 0.05);
    --pu-glass-border: rgba(255, 255, 255, 0.1);
  }

  /* Reset some body styles for the new theme */
  body.wp-singular {
    font-family: 'Outfit', sans-serif !important;
    background-color: var(--pu-dark) !important;
    color: var(--pu-text);
  }

  /* Glassmorphism Header */
  .pu-header {
    position: sticky;
    top: 0;
    z-index: 1000;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    background: rgba(10, 10, 16, 0.7);
    border-bottom: 1px solid var(--pu-glass-border);
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s ease;
  }
  
  .pu-logo {
    font-size: 28px;
    font-weight: 800;
    color: #fff;
    text-decoration: none;
    letter-spacing: 1px;
    background: linear-gradient(135deg, #fff, #a0a0a0);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .pu-nav {
    display: flex;
    gap: 30px;
  }

  .pu-nav a {
    color: #ccc;
    text-decoration: none;
    font-weight: 600;
    font-size: 16px;
    transition: color 0.3s ease;
  }

  .pu-nav a:hover {
    color: var(--pu-accent);
  }

  .pu-btn-primary {
    background: linear-gradient(135deg, var(--pu-primary), #7a00df);
    color: #fff;
    padding: 12px 28px;
    border-radius: 30px;
    font-weight: 600;
    text-decoration: none;
    box-shadow: 0 8px 20px rgba(82, 66, 216, 0.4);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .pu-btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(82, 66, 216, 0.6);
  }

  /* Hero Section */
  .pu-hero {
    position: relative;
    padding: 120px 40px;
    text-align: center;
    overflow: hidden;
  }

  .pu-hero::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -10%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(82,66,216,0.3) 0%, rgba(10,10,16,0) 70%);
    border-radius: 50%;
    z-index: -1;
    animation: float 8s infinite alternate;
  }

  .pu-hero::after {
    content: '';
    position: absolute;
    bottom: -30%;
    right: -10%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(255,94,133,0.2) 0%, rgba(10,10,16,0) 70%);
    border-radius: 50%;
    z-index: -1;
    animation: float 10s infinite alternate-reverse;
  }

  @keyframes float {
    0% { transform: translateY(0) scale(1); }
    100% { transform: translateY(30px) scale(1.1); }
  }

  .pu-hero h1 {
    font-size: 64px;
    font-weight: 800;
    color: #fff;
    margin-bottom: 24px;
    line-height: 1.1;
  }

  .pu-hero h1 span {
    background: linear-gradient(135deg, var(--pu-accent), var(--pu-primary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .pu-hero p {
    font-size: 20px;
    color: #a0a0b0;
    max-width: 600px;
    margin: 0 auto 40px;
    line-height: 1.6;
  }

  /* Hostel Categories Grid */
  .pu-categories {
    padding: 60px 40px 100px;
    max-width: 1400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 40px;
  }

  .pu-card {
    background: var(--pu-glass-bg);
    border: 1px solid var(--pu-glass-border);
    border-radius: 24px;
    padding: 40px;
    text-align: left;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  
  .pu-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 4px;
    background: linear-gradient(90deg, var(--pu-primary), var(--pu-accent));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s ease;
  }

  .pu-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
    background: rgba(255, 255, 255, 0.08);
  }
  
  .pu-card:hover::before {
    transform: scaleX(1);
  }

  .pu-card-icon {
    font-size: 48px;
    margin-bottom: 24px;
    display: inline-block;
  }

  .pu-card h3 {
    font-size: 28px;
    font-weight: 600;
    color: #fff;
    margin-bottom: 16px;
  }

  .pu-card p {
    color: #a0a0b0;
    font-size: 16px;
    line-height: 1.5;
    margin-bottom: 30px;
  }
  
  .pu-card-arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255,255,255,0.1);
    color: #fff;
    font-size: 20px;
    transition: all 0.3s ease;
  }
  
  .pu-card:hover .pu-card-arrow {
    background: var(--pu-primary);
    transform: translateX(10px);
  }
</style>
`;
html = html.replace('</head>', premiumCSS + '</head>');

// 3. Inject New HTML
const newUI = `
<!-- PU Hostel Frontend -->
<header class="pu-header">
  <a href="#" class="pu-logo">PU Hostel</a>
  <nav class="pu-nav">
    <a href="#">Home</a>
    <a href="#">Facilities</a>
    <a href="#">Gallery</a>
    <a href="#">Rules</a>
  </nav>
  <a href="#" class="pu-btn-primary">Book Now</a>
</header>

<section class="pu-hero">
  <h1>Welcome to your <span>Home</span> <br/>away from home</h1>
  <p>Experience the most premium, secure, and vibrant campus living environment designed specifically for your holistic growth.</p>
  <a href="#explore" class="pu-btn-primary" style="padding: 16px 40px; font-size: 18px;">Explore Hostels</a>
</section>

<section class="pu-categories" id="explore">
  
  <div class="pu-card">
    <div class="pu-card-icon">👨‍🎓</div>
    <h3>Boys Hostels</h3>
    <p>Modern accommodations with 24/7 security, high-speed Wi-Fi, and recreational areas designed for the ultimate student experience.</p>
    <div class="pu-card-arrow">→</div>
  </div>

  <div class="pu-card">
    <div class="pu-card-icon">👩‍🎓</div>
    <h3>Girls Hostels</h3>
    <p>Safe, comfortable, and vibrant spaces featuring exclusive amenities, fitness centers, and study lounges.</p>
    <div class="pu-card-arrow">→</div>
  </div>

  <div class="pu-card">
    <div class="pu-card-icon">🌟</div>
    <h3>Premium Hostels</h3>
    <p>International standard living with AC rooms, en-suite facilities, premium dining, and exclusive clubhouse access.</p>
    <div class="pu-card-arrow">→</div>
  </div>

</section>
<!-- End PU Hostel Frontend -->
`;

const injectTarget = '<main class="main-content">';
html = html.replace(injectTarget, injectTarget + '\n' + newUI);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully injected the new PU Hostel frontend.');
