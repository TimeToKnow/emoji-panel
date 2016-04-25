const Constant = require('../constant');
const setBase = require('../set');
const TWITTER = Constant.IMAGE_SET.TWITTER;
const SIZE20 = Constant.SIZE[20];

module.exports = api => setBase(api, TWITTER, SIZE20);
