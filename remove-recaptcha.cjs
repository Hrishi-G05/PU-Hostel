const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target1 = '<script id="google-recaptcha-js" src="js/api.js"></script>';
const target2 = '<script id="wpcf7-recaptcha-js-before">';
const target3 = '<script id="wpcf7-recaptcha-js" src="js/index_1.js"></script>';

// Remove target 1
if (html.includes(target1)) {
    html = html.replace(target1, '');
}

// Remove target 2 and everything until </script>
const startIdx = html.indexOf(target2);
if (startIdx !== -1) {
    const endIdx = html.indexOf('</script>', startIdx) + 9;
    html = html.slice(0, startIdx) + html.slice(endIdx);
}

// Remove target 3
if (html.includes(target3)) {
    html = html.replace(target3, '');
}

// Just to be absolutely safe, let's inject a CSS rule to hide the badge if it somehow still loads
const styleTag = '<style>.grecaptcha-badge { display: none !important; }</style>';
if (!html.includes(styleTag)) {
    html = html.replace('</head>', styleTag + '\n</head>');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('reCAPTCHA scripts removed and badge hidden.');
