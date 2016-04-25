const Constant = require('../constant');
const setBase = require('../set');
const EMOJIONE = Constant.IMAGE_SET.EMOJIONE;
const SIZE20 = Constant.SIZE[20];

module.exports = api => setBase(api, EMOJIONE, SIZE20);
