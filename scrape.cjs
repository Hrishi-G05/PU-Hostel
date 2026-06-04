const scrape = require('website-scraper');

const options = {
  urls: ['https://www.paruluniversity.ac.in/living-at-pu/'],
  directory: './public/parul-original',
  sources: [
    { selector: 'img', attr: 'src' },
    { selector: 'link[rel="stylesheet"]', attr: 'href' },
    { selector: 'script', attr: 'src' }
  ],
  maxRecursiveDepth: 0 // Only the single page, but all its assets
};

console.log('Starting scrape of https://www.paruluniversity.ac.in/living-at-pu/...');
console.log('This may take a few minutes to download all assets (images, css, js).');

scrape(options).then((result) => {
    console.log('Successfully downloaded site!');
    console.log('Result length:', result.length);
}).catch((err) => {
    console.error('Error scraping site:', err);
});
