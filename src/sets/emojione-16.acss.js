const Constant = require('../constant');
const setBase = require('../set');
const EMOJIONE = Constant.IMAGE_SET.EMOJIONE;
const SIZE16 = Constant.SIZE[16];

module.exports = api => setBase(api, EMOJIONE, SIZE16);
