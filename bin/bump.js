const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;
const bump = process.env.bump || 'patch';

execSync(`npm version ${bump} --no-git-tag-version`, {
  stdio: [0, 1, 2]
});
const version = require('../package.json').version;

const bowerFilePath = path.join(__dirname, '..', 'bower.json');
const bowerFile = require(bowerFilePath);
bowerFile.version = version;

fs.writeFileSync(bowerFilePath, JSON.stringify(bowerFile, null, 2));

execSync(`git add package.json bower.json && git commit -m "v${version}" && git tag v${version}`, {
  stdio: [0, 1, 2]
});
