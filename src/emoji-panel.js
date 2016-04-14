import { IMAGE_SET } from './constant';
import getImageSetTemplate from './get-image-set-template';

export default class EmojiPanel {
  static createWindowImageSet(imageSet) {
    const windowImageSet = document.createElement('div');
    const imageSetTemplate = getImageSetTemplate(imageSet);
    windowImageSet.innerHTML = imageSetTemplate;

    return windowImageSet;
  }
  constructor(el, { imageSet = IMAGE_SET.APPLE } = {}) {
    if (__DEV__) {
      if (!(el && el.nodeType)) {
        throw new Error('Element must be provided to the first argument of `EmojiPanel` constructor.');
      }
      if (Object.keys(IMAGE_SET).map(key => IMAGE_SET[key]).indexOf(imageSet) === -1) {
        throw new Error('`imageSet` should have one of `EmojiPanel.IMAGE_SET` values, got ${imageSet}.');
      }
    }
    const windowImageSet = EmojiPanel.createWindowImageSet(imageSet);
    el.innerHTML = '';
    el.appendChild(windowImageSet);
  }
}
// EmojiPanel static properties
EmojiPanel.IMAGE_SET = IMAGE_SET;
