fetch('https://www.shiksha.com/university/parul-university-vadodara-49779/photos')
  .then(r => r.text())
  .then(html => {
    const match = html.match(/https:\/\/[^"']+\.jpg/g);
    if (match) {
      console.log(match.slice(0, 10).join('\n'));
    } else {
      console.log('no match');
    }
  });
