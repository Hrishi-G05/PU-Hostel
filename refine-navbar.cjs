const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const replacementCSS = `
  /* Premium Glassmorphism Header */
  .pu-header {
    position: sticky;
    top: 16px;
    margin: 0 auto;
    width: 85%;
    max-width: 1200px;
    z-index: 1000;
    backdrop-filter: blur(30px) saturate(150%);
    -webkit-backdrop-filter: blur(30px) saturate(150%);
    background: rgba(255, 255, 255, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    border-right: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 50px;
    padding: 10px 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  
  .pu-header:hover {
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.9);
  }
  
  .pu-logo {
    font-size: 22px;
    font-weight: 800;
    color: var(--pu-primary);
    text-decoration: none;
    letter-spacing: 0.5px;
    display: flex;
    align-items: center;
  }

  .pu-nav {
    display: flex;
    gap: 32px;
  }

  .pu-nav a {
    color: var(--pu-text);
    text-decoration: none;
    font-weight: 500;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
    position: relative;
  }

  .pu-nav a::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--pu-primary);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }

  .pu-nav a:hover {
    color: var(--pu-primary);
  }
  
  .pu-nav a:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }

  .pu-btn-primary {
    background: linear-gradient(135deg, var(--pu-primary), #7a00df);
    color: #fff;
    padding: 10px 24px;
    border-radius: 40px;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.5px;
    text-decoration: none;
    box-shadow: 0 8px 15px rgba(82, 66, 216, 0.25);
    transition: all 0.3s ease;
  }

  .pu-btn-primary:hover {
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 12px 20px rgba(82, 66, 216, 0.4);
  }
`;

// We will use a regex to replace everything from .pu-header to the end of .pu-btn-primary:hover
const startIndex = html.indexOf('.pu-header {');
const endIndex = html.indexOf('}', html.indexOf('.pu-btn-primary:hover')) + 1;

if (startIndex !== -1 && endIndex !== -1) {
    html = html.slice(0, startIndex) + replacementCSS.trim() + html.slice(endIndex);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Successfully refined the navbar for a more premium look.');
} else {
    console.log('Could not find the target CSS block.');
}
