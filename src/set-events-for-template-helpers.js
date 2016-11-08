import categoryOrder from './category-order';
import { CATEGORY } from './constant';

export const getIsElementScrollable = el => {
  return el.clientHeight !== el.scrollHeight;
};

export const scrollElementTo = (el, done, newScrollHeight = 0, scrollDuration = 300) => {
  const stepSizeMs = 15;
  const scrollHeight = el.scrollTop;
  const scrollDiff = scrollHeight - newScrollHeight;
  const maxStep = Math.floor(scrollDuration / stepSizeMs);
  const scrollStep = Math.PI / maxStep;
  const cosParameter = scrollDiff / 2;
  const round = num => (((scrollDiff > 0 ? Math.ceil : Math.floor)(num * 2)).toFixed() / 2);
  let stepCount = 0;
  let scrollMargin = 0;

  const step = () => {
    stepCount = stepCount + 1;
    scrollMargin = round(cosParameter - cosParameter * Math.cos(stepCount * scrollStep));
    return stepCount === maxStep;
  };
  const draw = () => {
    el.scrollTop = scrollHeight - scrollMargin;
  };

  // `Loop` runs on each call from `requestAnimationFrame`, will run `step` each 16ms id
  let timeAccumulator = Date.now();
  const loop = () => {
    let finished = false;
    const now = Date.now();
    while (finished === false && (now - timeAccumulator) >= stepSizeMs) {
      finished = step();
      timeAccumulator += stepSizeMs;
    }
    draw();
    if (finished) {
      done();
    } else {
      requestAnimationFrame(loop);
    }
  };
  requestAnimationFrame(loop);
};

const marginParam = 100 / categoryOrder.length;
export const slideToCategory = (panelVariables, slideEl, categoryId) => {
  if (panelVariables.selectedCategoryId !== categoryId) {
    panelVariables.selectedCategoryId = categoryId;
    const selectedCategoryIndex = categoryOrder.indexOf(categoryId);
    slideEl.style.marginLeft = selectedCategoryIndex * marginParam + '%';
  }
};
