const emojiData = require('emoji-datasource');
const categoryDataMap = require('./map').categoryDataMap;

const sortedEmojiData = emojiData
  .map((emoji, index) => Object.assign(emoji, { index }))
  .sort((emojiA, emojiB) => emojiA['sort_order'] - emojiB['sort_order'])
  .reduce((obj, emoji) => {
    const category = categoryDataMap[emoji.category];
    const categoryArray = obj[category] || [];
    return Object.assign(obj, {
      [category]:  categoryArray.concat(emoji)
    });
  }, {});

module.exports = sortedEmojiData;
