const Constant = require('../constant');
const setBase = require('../set');
const TWITTER = Constant.IMAGE_SET.TWITTER;
const SIZE32 = Constant.SIZE[32];

module.exports = api => setBase(api, TWITTER, SIZE32);
