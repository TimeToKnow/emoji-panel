import emojiData from 'emoji-data';
import categoryOrder from './category-order';
import { IMAGE_SET, SIZE, CATEGORY } from './constant';
import { sizeMap, categoryDataMap, categoryNameMap } from './map';

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

const getSizeKeyByValue = size => {
  return sizeMap[size];
};

const getEmojiClassNameByImageSetAndSize = ({ imageSet, size } = {}) => {
  const sizeString = getSizeKeyByValue(size);

  let imageSetString;
  switch (imageSet) {
  case IMAGE_SET.APPLE:
    imageSetString = 'a';
    break;
  case IMAGE_SET.GOOGLE:
    imageSetString = 'g';
    break;
  case IMAGE_SET.TWITTER:
    imageSetString = 't';
    break;
  case IMAGE_SET.EMOJIONE:
    imageSetString = 'e';
    break;
  }

  const emojiClassName = `ep-e-${imageSetString}-${sizeString}`;
  return emojiClassName;
};

const getSortedEmojiData = imageSet => {
  const boolName = getBoolNameByImageSet(imageSet);

  const sortedEmojiData = emojiData
    .sort((emojiA, emojiB) => emojiA['sort_order'] - emojiB['sort_order'])
    .reduce((obj, emoji) => {
      if (emoji[boolName]) {
        const category = categoryDataMap[emoji.category];
        const categoryArray = obj[category] || [];
        return Object.assign(obj, {
          [category]:  categoryArray.concat(emoji)
        });
      } else {
        return obj;
      }
    }, {});
  return sortedEmojiData;
};

export default ({ imageSet, size } = {}) => {
  const sortedEmojiData = getSortedEmojiData(imageSet);
  const emojiClassName = getEmojiClassNameByImageSetAndSize({ imageSet, size });
  const sizeNumber = Number(getSizeKeyByValue(size));

  return (`
    <div class="ep">
      <div class="ep-categories">
        ${categoryOrder.map(category => `
        <span class="ep-c" data-category-id=${category}>
          <span class="cat cat-${category}"></span>
          <span class="ep-c-text">${categoryNameMap[category]}</span>
        </span>
        `).join('')}
      </div>
      <div class="ep-emojies">
        ${categoryOrder.map(category => `
        <div class="ep-emojies-c" data-category-id=${category}>
          <div>
            ${sortedEmojiData[category].map(emoji => `
            <span class="ep-e ${emojiClassName}" style="background-position: -${emoji.sheet_x * sizeNumber}px -${emoji.sheet_y * sizeNumber}px">
            </span>
            `).join('')}
          </div>
        </div>
        `).join('')}
      </div>
    </div>
    `);
};
