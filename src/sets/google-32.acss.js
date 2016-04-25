const Constant = require('../constant');
const setBase = require('../set');
const GOOGLE = Constant.IMAGE_SET.GOOGLE;
const SIZE32 = Constant.SIZE[32];

module.exports = api => setBase(api, GOOGLE, SIZE32);
