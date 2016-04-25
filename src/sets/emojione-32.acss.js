const Constant = require('../constant');
const setBase = require('../set');
const EMOJIONE = Constant.IMAGE_SET.EMOJIONE;
const SIZE32 = Constant.SIZE[32];

module.exports = api => setBase(api, EMOJIONE, SIZE32);
