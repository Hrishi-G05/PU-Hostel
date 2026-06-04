const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove reCAPTCHA
const target1 = '<script id="google-recaptcha-js" src="js/api.js"></script>';
const target2 = '<script id="wpcf7-recaptcha-js-before">';
const target3 = '<script id="wpcf7-recaptcha-js" src="js/index.js"></script>';
html = html.replace(target1, '').replace(target2, '').replace(target3, '');
// hide badge
html = html.replace('</head>', '<style>.grecaptcha-badge { display: none !important; }</style>\n</head>');

// 2. Remove MS Dhoni chat widget
const widgetStart = html.indexOf('<div id="ocp-notification"');
if (widgetStart !== -1) {
    const widgetEnd = html.indexOf('</script>', html.indexOf('updateNotification();')) + 9;
    if (widgetEnd > widgetStart) {
        html = html.slice(0, widgetStart) + html.slice(widgetEnd);
    }
}

// 3. Remove all outbound links
const aggressiveHref = /href\s*=\s*["'][^"']*paruluniversity[^"']*["']/gi;
html = html.replace(aggressiveHref, 'href="#"');
const aggressiveAction = /action\s*=\s*["'][^"']*paruluniversity[^"']*["']/gi;
html = html.replace(aggressiveAction, 'action="#"');
const aggressiveOnclick = /onclick\s*=\s*["'][^"']*paruluniversity[^"']*["']/gi;
html = html.replace(aggressiveOnclick, 'onclick="return false;"');

// 4. Inject global click interceptor
const interceptor = `
<script>
document.addEventListener('click', function(e) {
    let target = e.target;
    while(target && target !== document) {
        if(target.tagName === 'A') {
            e.preventDefault();
            break;
        }
        target = target.parentNode;
    }
}, true);
</script>
</body>
`;
html = html.replace('</body>', interceptor);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Applied targeted fixes to restored site.');
