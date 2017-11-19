const Constant = require('./constant');
const IMAGE_SET = Constant.IMAGE_SET;
const SIZE = Constant.SIZE;
const CATEGORY = Constant.CATEGORY;

const categoryDataMap = {
  'Activities': CATEGORY.ACTIVITY,
  'Flags': CATEGORY.FLAGS,
  'Food & Drink': CATEGORY.FOODS,
  'Animals & Nature': CATEGORY.NATURE,
  'Objects': CATEGORY.OBJECTS,
  'Smileys & People': CATEGORY.PEOPLE,
  'Travel & Places': CATEGORY.PLACES,
  'Symbols': CATEGORY.SYMBOLS
};

const categoryNameMap = {
  [CATEGORY.ACTIVITY]: 'ACTIVITY',
  [CATEGORY.FLAGS]: 'FLAGS',
  [CATEGORY.FOODS]: 'FOOD & DRINK',
  [CATEGORY.NATURE]: 'ANIMALS & NATURE',
  [CATEGORY.OBJECTS]: 'OBJECTS',
  [CATEGORY.PEOPLE]: 'SMILEYS & PEOPLE',
  [CATEGORY.PLACES]: 'TRAVEL & PLACES',
  [CATEGORY.SYMBOLS]: 'SYMBOLS'
};

const sizeMap = {
  '0': 16,
  '1': 20,
  '2': 32,
  '4': 64
};

module.exports = { categoryDataMap, categoryNameMap, sizeMap };
