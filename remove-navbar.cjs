const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const startIdx = html.indexOf('<header class="header custom-navbar" id="header"');
const endIdx = html.indexOf('</style>', startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    // Remove the entire block including </style>
    html = html.slice(0, startIdx) + html.slice(endIdx + 8);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Successfully removed the navbar block.');
} else {
    console.log('Could not find the navbar block.');
}
