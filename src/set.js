'use strict';

const emojiData = require('./emoji.data');
const categoryOrder = require('./category-order');
const Constant = require('./constant');
const Map = require('./map');
const IMAGE_SET = Constant.IMAGE_SET;
const SIZE = Constant.SIZE;
const sizeMap = Map.sizeMap;

const getSizeKeyByValue = size => {
  return sizeMap[size];
};

const getImageFileLocation = (imageSet, size) => {
  const sizeStr = getSizeKeyByValue(size);
  let imageSetStr;
  switch (imageSet) {
  case IMAGE_SET.APPLE:
    imageSetStr = 'apple';
    break;
  case IMAGE_SET.GOOGLE:
    imageSetStr = 'google';
    break;
  case IMAGE_SET.TWITTER:
    imageSetStr = 'twitter';
    break;
  case IMAGE_SET.EMOJIONE:
    imageSetStr = 'emojione';
    break;
  }
  return `~emoji-data/sheet_${imageSetStr}_${sizeStr}.png`;
};

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

const sizeCategoriesIcons = 32;
const sizeCategories = 40;

module.exports = (api, imageSet, size) => {
  const sizeNumber = Number(getSizeKeyByValue(size));
  const backgroundImageFileLocation = getImageFileLocation(imageSet, size);
  api.add(Object.assign({
    '.ep-e': {
      width: sizeNumber + 'px',
      height: sizeNumber + 'px',
      'background-image': `url('${backgroundImageFileLocation}')`
    },
    '.ep-slide': {
      width: `${100 / categoryOrder.length}%`
    }
  }, categoryOrder.reduce((catObj, category) => Object.assign(catObj,
    emojiData[category].reduce((emojiObj, emoji) => Object.assign(emojiObj, {
      [`.ep-e[data-index="${emoji.index}"]`]: Object.assign({
        'background-position': `-${sizeNumber * emoji.sheet_x}px -${sizeNumber * emoji.sheet_y}px`
      }, !emoji[getBoolNameByImageSet(imageSet)] && {
        display: 'none'
      })
    }), {})
  ), {})));
};
