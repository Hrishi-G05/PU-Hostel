const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Remove the widget
const widgetStart = html.indexOf('<div id="ocp-notification"');
const widgetEnd = html.indexOf('</script>', html.indexOf('updateNotification();')) + 9;
if (widgetStart !== -1 && widgetEnd !== -1) {
    html = html.slice(0, widgetStart) + html.slice(widgetEnd);
    console.log('Removed chat widget.');
}

// Remove the header
const headerStart = html.indexOf('<header class="header" id="header">');
const headerEnd = html.indexOf('</header>') + 9;
if (headerStart !== -1 && headerEnd !== -1) {
    const customHeader = `
    <header class="header custom-navbar" id="header" style="position: sticky; top: 0; z-index: 9999; background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid rgba(255, 255, 255, 0.3); box-shadow: 0 4px 30px rgba(0, 0, 0, 0.05); padding: 15px 0; transition: all 0.3s ease;">
      <div class="container" style="display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto; padding: 0 20px;">
        <div class="navbar-logo">
          <a href="#" style="text-decoration: none;">
            <!-- Using text instead of their logo if it's too complex, or we can use their logo image -->
            <img src="images/Parul-University-logo.svg" alt="Parul University" style="height: 50px; max-width: 100%; object-fit: contain;">
          </a>
        </div>
        <nav class="navbar-links" style="display: flex; gap: 30px; align-items: center;">
          <a href="#" style="text-decoration: none; color: #1a1a1a; font-family: 'Anderson Grotesk', sans-serif; font-weight: 600; font-size: 16px; transition: color 0.3s ease;">Home</a>
          <a href="#" style="text-decoration: none; color: #1a1a1a; font-family: 'Anderson Grotesk', sans-serif; font-weight: 600; font-size: 16px; transition: color 0.3s ease;">About</a>
          <a href="#" style="text-decoration: none; color: #1a1a1a; font-family: 'Anderson Grotesk', sans-serif; font-weight: 600; font-size: 16px; transition: color 0.3s ease;">Academics</a>
          <a href="#" style="text-decoration: none; color: #1a1a1a; font-family: 'Anderson Grotesk', sans-serif; font-weight: 600; font-size: 16px; transition: color 0.3s ease;">Admissions</a>
          <a href="#" style="text-decoration: none; color: #1a1a1a; font-family: 'Anderson Grotesk', sans-serif; font-weight: 600; font-size: 16px; transition: color 0.3s ease;">Campus Life</a>
          <a href="#" style="background: linear-gradient(135deg, #e71a23, #b3121b); color: white; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-family: 'Anderson Grotesk', sans-serif; font-weight: 700; font-size: 15px; transition: transform 0.2s ease, box-shadow 0.2s ease; box-shadow: 0 4px 15px rgba(231, 26, 35, 0.3);">Apply Now</a>
        </nav>
      </div>
    </header>
    <style>
      .navbar-links a:not([style*="background"]):hover {
        color: #e71a23 !important;
      }
      .navbar-links a[style*="background"]:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(231, 26, 35, 0.4) !important;
      }
    </style>
    `;
    html = html.slice(0, headerStart) + customHeader + html.slice(headerEnd);
    console.log('Replaced header with sleek navbar.');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Done.');
