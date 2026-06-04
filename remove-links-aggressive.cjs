const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Aggressive replacement of ANY href containing paruluniversity
const aggressiveHref = /href\s*=\s*["'][^"']*paruluniversity[^"']*["']/gi;
html = html.replace(aggressiveHref, 'href="#"');

// Aggressive replacement of ANY action containing paruluniversity
const aggressiveAction = /action\s*=\s*["'][^"']*paruluniversity[^"']*["']/gi;
html = html.replace(aggressiveAction, 'action="#"');

// Aggressive replacement of ANY onclick containing paruluniversity (just in case)
const aggressiveOnclick = /onclick\s*=\s*["'][^"']*paruluniversity[^"']*["']/gi;
html = html.replace(aggressiveOnclick, 'onclick="return false;"');

fs.writeFileSync('index.html', html, 'utf8');
console.log('Aggressive link removal executed.');
