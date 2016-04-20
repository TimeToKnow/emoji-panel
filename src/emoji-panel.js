import { IMAGE_SET, SIZE } from './constant';
import createPanel from './create-panel';

export default class EmojiPanel {
  constructor(el, { imageSet = IMAGE_SET.APPLE, size = SIZE['64'], animationDuration = 300 } = {}) {
    if (__DEV__) {
      if (!(el && el.nodeType)) {
        throw new Error('Element must be provided to the first argument of `EmojiPanel` constructor.');
      }
      if (Object.keys(IMAGE_SET).map(key => IMAGE_SET[key]).indexOf(imageSet) === -1) {
        throw new Error('`imageSet` should have one of `EmojiPanel.IMAGE_SET` values, got ${imageSet}.');
      }
    }
    const windowImageSet = createPanel({ imageSet, size, animationDuration });
    el.innerHTML = '';
    el.appendChild(windowImageSet);

    // Privates
    this._eventListeners = {
      click: []
    };
  }
}
// EmojiPanel static properties
EmojiPanel.IMAGE_SET = IMAGE_SET;
EmojiPanel.SIZE = SIZE;
