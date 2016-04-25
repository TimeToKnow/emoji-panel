const Constant = require('../constant');
const setBase = require('../set');
const TWITTER = Constant.IMAGE_SET.TWITTER;
const SIZE64 = Constant.SIZE[64];

module.exports = api => setBase(api, TWITTER, SIZE64);
