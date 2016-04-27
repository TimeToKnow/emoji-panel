const execSync = require('child_process').execSync;
const bump = process.argv[2] || 'patch';

execSync(`npm version ${bump}`, {
  stdio: [0, 1, 2]
});
