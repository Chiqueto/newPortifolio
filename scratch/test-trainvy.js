const https = require('https');
https.get('https://trainvy.vercel.app/', res => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    const text = data.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
    let pos = 0;
    while ((pos = text.indexOf('3D', pos)) !== -1) {
      console.log('--- FOUND 3D at', pos, '---');
      console.log(text.slice(Math.max(0, pos - 100), Math.min(text.length, pos + 300)));
      pos += 2;
    }
  });
});
