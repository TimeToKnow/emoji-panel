const emojiData = require('./emoji-data');
const categoryOrder = require('./category-order');
const Constant = require('./constant');
const Map = require('./map');
const IMAGE_SET = Constant.IMAGE_SET;
const SIZE = Constant.SIZE;
const sizeMap = Map.sizeMap;
const categoryDataMap = Map.categoryDataMap;
const categoryNameMap = Map.categoryNameMap;

module.exports = api => {
  api.morph('html').add({
    'div[class="ep"]': {
      'div[class="ep-categories"]': [
        {
          'span[class="ep-slide"]': ''
        },
        categoryOrder.reduce((obj, category) => Object.assign(obj, {
          [`span[class="ep-c" data-category-id="${category}"]`]: {
            [`span[class="cat cat-${category}"]`]: '',
            'span[class="ep-c-text"]': categoryNameMap[category]
          }
        }), {})
      ],
      'div[class="ep-emojies"]': categoryOrder.reduce((catObj, category) => Object.assign(catObj, {
        [`div[class="ep-emojies-c" data-category-id="${category}"]`]: emojiData[category].reduce((emojiObj, emoji) => Object.assign(emojiObj, {
          [`span[class="ep-e" data-index="${emoji.index}" data-unified="${emoji.unified}"]`]: ''
        }), {})
      }), {})
    }
  });
};
