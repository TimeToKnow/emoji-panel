const spawn = require('child_process').spawn;
const bump = process.argv[2] || 'patch';

spawn(`npm version ${bump}`);
