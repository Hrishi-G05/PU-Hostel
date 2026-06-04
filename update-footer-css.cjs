const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Update background to full black and padding
html = html.replace('background: rgba(10, 12, 16, 0.85); /* Deep Onyx Glass */', 'background: #000000; /* Solid Black */');
html = html.replace('padding-top: 80px;', 'padding-top: 120px;');

// Increase gap in grid
html = html.replace('gap: 50px;\n    padding-bottom: 60px;', 'gap: 80px;\n    padding-bottom: 80px;');

// Increase Brand Font
html = html.replace('font-size: 32px;\n    font-weight: 900;', 'font-size: 42px;\n    font-weight: 900;');

// Increase Headers Font
html = html.replace('font-size: 18px;\n    color: #fff;\n    font-weight: 600;', 'font-size: 22px;\n    color: #fff;\n    font-weight: 600;');

// Increase Paragraphs Font
html = html.replace('font-size: 15px;\n    line-height: 1.7;\n    margin-bottom: 25px;\n    max-width: 350px;', 'font-size: 18px;\n    line-height: 1.8;\n    margin-bottom: 30px;\n    max-width: 400px;');

// Increase Links Font
html = html.replace('margin-bottom: 15px;\n    font-size: 15px;\n    transition: color 0.3s ease;', 'margin-bottom: 18px;\n    font-size: 18px;\n    transition: color 0.3s ease;');

// Increase Social Icons
html = html.replace('width: 45px;\n    height: 45px;\n    border-radius: 50%;', 'width: 55px;\n    height: 55px;\n    border-radius: 50%;');
html = html.replace('font-size: 16px;\n    text-decoration: none;', 'font-size: 20px;\n    text-decoration: none;');

// Increase Input Field padding and font
html = html.replace('padding: 14px 20px;\n    border-radius: 30px;', 'padding: 18px 25px;\n    border-radius: 30px;\n    font-size: 16px;');
html = html.replace('padding: 14px 28px;\n    border-radius: 30px;', 'padding: 18px 35px;\n    border-radius: 30px;\n    font-size: 18px;');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Footer styles updated for solid black and larger layout.');
