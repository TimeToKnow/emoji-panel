const Constant = require('../constant');
const setBase = require('../set');
const APPLE = Constant.IMAGE_SET.APPLE;
const SIZE16 = Constant.SIZE[16];

module.exports = api => setBase(api, APPLE, SIZE16);
