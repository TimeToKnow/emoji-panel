const emojiData = require('./emoji.data');
const categoryOrder = require('./category-order');
const Constant = require('./constant');
const Map = require('./map');
const IMAGE_SET = Constant.IMAGE_SET;
const SIZE = Constant.SIZE;
const sizeMap = Map.sizeMap;
const categoryDataMap = Map.categoryDataMap;
const categoryNameMap = Map.categoryNameMap;

const getBoolNameByImageSet = imageSet => {
  switch (imageSet) {
  case IMAGE_SET.APPLE:
    return 'has_img_apple';
  case IMAGE_SET.GOOGLE:
    return 'has_img_google';
  case IMAGE_SET.TWITTER:
    return 'has_img_twitter';
  case IMAGE_SET.EMOJIONE:
    return 'has_img_emojione';
  }
};
const getImageSetClassName = imageSet => {
  switch (imageSet) {
  case IMAGE_SET.APPLE:
    return 'ep-a';
  case IMAGE_SET.GOOGLE:
    return 'ep-g';
  case IMAGE_SET.TWITTER:
    return 'ep-t';
  case IMAGE_SET.EMOJIONE:
    return 'ep-e';
  }
};

const getSizeKeyByValue = size => {
  return sizeMap[size];
};

const getEmojiClassName = emoji => {
  const className = Object.keys(IMAGE_SET).reduce((_className, imageSetKey) => {
    const imageSet = IMAGE_SET[imageSetKey];
    const boolNameForImageSet = getBoolNameByImageSet(imageSet);
    if (emoji[boolNameForImageSet]) {
      const imageSetClassName = getImageSetClassName(imageSet);
      return _className + ` ${imageSetClassName}`;
    } else {
      return _className;
    }
  }, '');
  return className;
};

module.exports = api => {
  api.morph('html').add({
    'div[class="ep"]': {
      'div[class="ep-categories"]': categoryOrder.reduce((obj, category) => Object.assign(obj, {
        [`span[class="ep-c" data-category-id="${category}"]`]: {
          [`span[class="cat cat-${category}"]`]: '',
          'span[class="ep-c-text"]': categoryNameMap[category]
        }
      }), {}),
      'div[class="ep-emojies"]': categoryOrder.reduce((catObj, category) => Object.assign(catObj, {
        [`div[class="ep-emojies-c" data-category-id="${category}"]`]: {
          'div': emojiData[category].reduce((emojiObj, emoji) => Object.assign(emojiObj, {
            [`span[class="ep-emoji${getEmojiClassName(emoji)}" data-index="${emoji.index}"]`]: ''
          }), {})
        }
      }), {})
    }
  });
};
