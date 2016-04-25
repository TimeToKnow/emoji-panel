const Constant = require('../constant');
const setBase = require('../set');
const APPLE = Constant.IMAGE_SET.APPLE;
const SIZE32 = Constant.SIZE[32];

module.exports = api => setBase(api, APPLE, SIZE32);
