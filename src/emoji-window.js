import { IMAGE_SET } from './constant';
import getImageSetTemplate from './get-image-set-template';

let existingWindowImageSetsWrapper;
const existingWindowImageSets = {};
export default class EmojiWindow {
  static getTopLeft({
    el, x, y
  } = {}) {
    if (__DEV__ && el === undefined && (x === undefined || y === undefined)) {
      throw new Error('Must provide `position` with `x` and `y`, or `el` to open from.');
    }
    let left = x;
    let top = y;
    if (left === undefined) {
      left = el.offsetLeft + el.clientWidth;
    }
    if (top === undefined) {
      top = el.offsetTop + el.clientHeight;
    }
    return {
      left,
      top
    };
  }
  static getWindowImageSetByImageSet(imageSet) {
    const existingWindowImageSet = existingWindowImageSets[imageSet];
    // If windowImageSet exists on object, return it,
    // If not, create it
    // Only one imageSet should be present
    return existingWindowImageSet !== undefined ? existingWindowImageSet : EmojiWindow.createWindowImageSet(imageSet);
  }
  static createWindowImageSet(imageSet) {
    const windowImageSet = document.createElement('div');
    existingWindowImageSets[imageSet] = windowImageSet;

    const imageSetTemplate = getImageSetTemplate(imageSet);
    windowImageSet.innerHTML = imageSetTemplate;

    const windowImageSetsWrapper = EmojiWindow.getWindowImageSetsWrapper();
    windowImageSetsWrapper.appendChild(windowImageSet);

    return windowImageSet;
  }
  static getWindowImageSetsWrapper() {
    if (existingWindowImageSetsWrapper === undefined) {
      existingWindowImageSetsWrapper = document.createElement('div');
      document.body.appendChild(existingWindowImageSetsWrapper);
    }
    return existingWindowImageSetsWrapper;
  }
  constructor({ imageSet = IMAGE_SET.APPLE, position } = {}) {
    if (__DEV__) {
      if (Object.keys(IMAGE_SET).map(key => IMAGE_SET[key]).indexOf(imageSet) === -1) {
        throw new Error('`imageSet` should have one of `EmojiWindow.IMAGE_SET` values, got ${imageSet}.');
      }
    }
    const { left, top } = EmojiWindow.getTopLeft(position);
    const windowImageSet = EmojiWindow.getWindowImageSetByImageSet(imageSet);
  }
}
// EmojiWindow static properties
EmojiWindow.IMAGE_SET = IMAGE_SET;
