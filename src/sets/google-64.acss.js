const Constant = require('../constant');
const setBase = require('../set');
const GOOGLE = Constant.IMAGE_SET.GOOGLE;
const SIZE64 = Constant.SIZE[64];

module.exports = api => setBase(api, GOOGLE, SIZE64);
