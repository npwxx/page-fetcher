const request = require('request');
const fs = require('fs');
const filePath = process.argv[3];
request(process.argv[2], (error, response, body) => {
  if (error) {
    console.log('Ruhroh! Something went wrong with your request!', error.message)
    return;
  }
  if (response.statusCode >= 400) {
    console.log('Rugroh! Something went wrong!', response.statusMessage);
    return;
  }
  fs.writeFile(filePath, body, (err) => {
    if (err) {
      console.log('Ruhroh! Something went wrong!', err.message);
      return;
    }
    fs.stat(filePath, (err, stats) => {
      console.log(`Downloaded and saved ${stats.size} bytes to ${filePath}`);
    });
  });
});
