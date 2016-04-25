const Constant = require('../constant');
const setBase = require('../set');
const EMOJIONE = Constant.IMAGE_SET.EMOJIONE;
const SIZE64 = Constant.SIZE[64];

module.exports = api => setBase(api, EMOJIONE, SIZE64);
