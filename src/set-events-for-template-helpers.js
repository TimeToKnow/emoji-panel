import categoryOrder from './category-order';
import { CATEGORY } from './constant';

export const getIsElementScrollable = el => {
  return el.clientHeight !== el.scrollHeight;
};

export const round = num => ((num * 2).toFixed() / 2);

export const scrollElementTo = (el, done, newScrollHeight = 0, scrollDuration = 300) => {
  const scrollHeight = el.scrollTop;
  const scrollDiff = scrollHeight - newScrollHeight;
  const scrollStep = Math.PI / (scrollDuration / 15);
  const cosParameter = scrollDiff / 2;
  let scrollCount = 0;
  let scrollMargin;

  const step = () => {
    setTimeout(() => {
      if (el.scrollTop !== newScrollHeight) {
        requestAnimationFrame(step);
        scrollCount = scrollCount + 1;
        scrollMargin = round(cosParameter - cosParameter * Math.cos(scrollCount * scrollStep));
        el.scrollTop = scrollHeight - scrollMargin;
      } else {
        done();
      }
    }, 15);
  };

  requestAnimationFrame(step);
};

const marginParam = 100 / categoryOrder.length;
export const slideToCategory = (panelVariables, slideEl, categoryId) => {
  if (panelVariables.selectedCategoryId !== categoryId) {
    panelVariables.selectedCategoryId = categoryId;
    const selectedCategoryIndex = categoryOrder.indexOf(categoryId);
    slideEl.style.marginLeft = selectedCategoryIndex * marginParam + '%';
  }
};
