const fs = require('fs');
const ghdownload = require('github-download');
const path = require('path');

const emojiDataPackageLocation = path.join(__dirname, '..', 'emoji-data');

fs.access(emojiDataPackageLocation, fs.F_OK, err => {
  if (err) {
    // Directory doesn't exist, download
    ghdownload({
      user: 'iamcal',
      repo: 'emoji-data',
      ref: 'master' // Waiting for pull request and then change to 'v2.4.1'
    }, emojiDataPackageLocation)
    .on('dir', dir => {
      console.log(dir);
    })
    .on('file', file => {
      console.log(file);
    })
    .on('zip', zipUrl => { //only emitted if Github API limit is reached and the zip file is downloaded
      console.log(zipUrl);
    })
    .on('error', err => {
      console.log(err);
    })
    .on('end', () => {
      console.log('Finished downloading emoji-data');
    });
  } else {
    console.log('emoji-data already downloaded, skipping download');
  }
});
