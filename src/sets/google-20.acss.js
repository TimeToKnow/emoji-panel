const Constant = require('../constant');
const setBase = require('../set');
const GOOGLE = Constant.IMAGE_SET.GOOGLE;
const SIZE20 = Constant.SIZE[20];

module.exports = api => setBase(api, GOOGLE, SIZE20);
