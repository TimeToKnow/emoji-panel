import emojiData from 'emoji-data';
import { IMAGE_SET, CATEGORIES } from './constant';

const getSortedEmojiData = () => {
  const categoryMap = Object.keys(CATEGORIES)
    .reduce((obj, category) => Object.assign(obj, {
      [CATEGORIES[category]]: category
    }),
  {});

  const sortedEmojiData = emojiData
    .sort((emojiA, emojiB) => emojiA['sort_order'] - emojiB['sort_order'])
    .reduce((obj, emoji) => {
      const categoryName = categoryMap[emoji.category];
      const categoryArray = obj[categoryName] || [];
      return Object.assign(obj, {
        [categoryName]:  categoryArray.concat(emoji)
      });
    }, {});
  return sortedEmojiData;
};

export default imageSet => {
  const sortedEmojiData = getSortedEmojiData();

  return (`
    <div>
      <div>
        ${Object.keys(CATEGORIES).map(category => `
        <span>
          ${category}
        </span>
        `).join('')}
      </div>
      <div>
        ${Object.keys(CATEGORIES).map(category => `
        <div>
          <div>
            ${category}
          </div>
          <div>
            ${sortedEmojiData[category].map(emoji => `
            <span>
              ${emoji.name}
            </span>
            `).join('')}
          </div>
        </div>
        `).join('')}
      </div>
    </div>
    `);
};
