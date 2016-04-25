const Constant = require('../constant');
const setBase = require('../set');
const APPLE = Constant.IMAGE_SET.APPLE;
const SIZE64 = Constant.SIZE[64];

module.exports = api => setBase(api, APPLE, SIZE64);
