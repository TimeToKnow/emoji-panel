const fs = require('fs');
const execSync = require('child_process').execSync;
const bump = process.argv[2] || 'patch';

execSync(`npm version ${bump} --no-git-tag-version`, {
  stdio: [0, 1, 2]
});
const version = require('../package.json').version;

const bowerFilePath = '../bower.json';
const bowerFile = require(bowerFilePath);
bowerFile.version = version;

fs.writeFileSync(bowerFilePath, JSON.stringify(bowerFile, null, 2));

execSync(`git add package.json bower.json && git commit -m "v${version}" && git tag v${version}`, {
  stdio: [0, 1, 2]
});
