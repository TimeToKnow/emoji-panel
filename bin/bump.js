const path = require('path');
const execSync = require('child_process').execSync;
const bump = process.argv[2] || 'patch';

execSync(`npm version --no-git-tag-version ${bump}`, {
  stdio: [0, 1, 2],
  cwd: path.join(__dirname, '..')
});
