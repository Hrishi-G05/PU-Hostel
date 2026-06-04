const https = require('https');
const fs = require('fs');

const url = 'https://upload.wikimedia.org/wikipedia/en/4/4b/Parul_University_logo.png';
const options = {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
};

https.get(url, options, (res) => {
  if (res.statusCode === 200) {
    res.pipe(fs.createWriteStream('images/PU_Logo_Color.png'))
       .on('finish', () => console.log('Downloaded logo successfully.'));
  } else {
    console.error('Failed with status code:', res.statusCode);
  }
});
