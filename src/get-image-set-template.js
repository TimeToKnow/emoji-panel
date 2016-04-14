import emojiData from 'emoji-data';
import { IMAGE_SET, SIZE, CATEGORY } from './constant';

const categoryMap = {
  Activity: CATEGORY.ACTIVITY,
  Flags: CATEGORY.FLAGS,
  Foods: CATEGORY.FOODS,
  Nature: CATEGORY.NATURE,
  Objects: CATEGORY.OBJECTS,
  People: CATEGORY.PEOPLE,
  Places: CATEGORY.PLACES,
  Symbols: CATEGORY.SYMBOLS,
  null: CATEGORY.OTHER
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

const sizeMap = Object.keys(SIZE).reduce((obj, sizeKey) => Object.assign(obj, { [SIZE[sizeKey]]: sizeKey }), {});

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
        const category = categoryMap[emoji.category];
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
    <div>
      <div>
        ${Object.keys(CATEGORY).map(categoryKey => `
        <span>
          ${categoryKey}
        </span>
        `).join('')}
      </div>
      <div>
        ${Object.keys(CATEGORY).map(categoryKey => `
        <div>
          <div>
            ${categoryKey}
          </div>
          <div>
            ${sortedEmojiData[CATEGORY[categoryKey]].map(emoji => `
            <span class=${emojiClassName} style="width: ${sizeNumber}px; height: ${sizeNumber}px; background-position: -${emoji.sheet_x * sizeNumber}px -${emoji.sheet_y * sizeNumber}px;">
            </span>
            `).join('')}
          </div>
        </div>
        `).join('')}
      </div>
    </div>
    `);
};
