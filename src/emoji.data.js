const emojiData = require('emoji-data');
const categoryDataMap = require('./map').categoryDataMap;

const sortedEmojiData = emojiData
  .sort((emojiA, emojiB) => emojiA['sort_order'] - emojiB['sort_order'])
  .reduce((obj, emoji, index) => {
    const category = categoryDataMap[emoji.category];
    const categoryArray = obj[category] || [];
    return Object.assign(obj, {
      [category]:  categoryArray.concat(Object.assign(emoji, { index }))
    });
  }, {});

module.exports = sortedEmojiData;
