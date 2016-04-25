const Constant = require('../constant');
const setBase = require('../set');
const APPLE = Constant.IMAGE_SET.APPLE;
const SIZE20 = Constant.SIZE[20];

module.exports = api => setBase(api, APPLE, SIZE20);
