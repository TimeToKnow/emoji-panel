import emojiData from 'emoji-data/emoji.json';

const existingWindowSets = {};
export default class EmojiWindow {
  constructor({
    position: {
      el,
      x,
      y
    } = {}
  } = {}) {
    const left = x !== undefined ? x : (el.offsetLeft + el.clientWidth);
    const top = y !== undefined ? y : (el.offsetTop + el.clientHeight);
    console.log(emojiData);
  }
}
