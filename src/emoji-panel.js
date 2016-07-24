import { IMAGE_SET, SIZE } from './constant';
import createPanel from './create-panel';

module.exports = class EmojiPanel {
  constructor(el, { animationDuration = 300, onClick } = {}) {
    if (__DEV__) {
      if (!(el && el.nodeType)) {
        throw new Error('Element must be provided to the first argument of `EmojiPanel` constructor.');
      }
      if (typeof animationDuration !== 'number') {
        throw new Error('`animationDuration` should be a number, got ${typeof animationDuration}.');
      }
      if (onClick !== undefined && typeof onClick !== 'function') {
        throw new Error('`onClick` should be a function, got ${typeof onClick}.');
      }
    }
    // Privates
    this._eventListeners = { onClick };

    const windowImageSet = createPanel({
      animationDuration,
      eventListeners: this._eventListeners
    });

    el.innerHTML = '';
    el.appendChild(windowImageSet);
  }
};
