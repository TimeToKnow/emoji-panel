const Constant = require('../constant');
const setBase = require('../set');
const GOOGLE = Constant.IMAGE_SET.GOOGLE;
const SIZE16 = Constant.SIZE[16];

module.exports = api => setBase(api, GOOGLE, SIZE16);
