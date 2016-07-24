import categoryOrder from './category-order';
import { CATEGORY } from './constant';

const getIsElementScrollable = el => {
  return el.clientHeight !== el.scrollHeight;
};

const round = num => ((num * 2).toFixed() / 2);

const scrollElementTo = (el, done, newScrollHeight = 0, scrollDuration = 300) => {
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
const slideToCategory = (panelVariables, slideEl, categoryId) => {
  if (panelVariables.selectedCategoryId !== categoryId) {
    panelVariables.selectedCategoryId = categoryId;
    const selectedCategoryIndex = categoryOrder.indexOf(categoryId);
    slideEl.style.marginLeft = selectedCategoryIndex * marginParam + '%';
  }
};

export default (el, { animationDuration, eventListeners } = {}) => {
  const panelVariables = {
    isMidScrollAnimation: false
  };

  const categoriesEl = el.querySelector('.ep-categories');
  const slideEl = el.querySelector('.ep-slide');
  const emojiesContainer = el.querySelector('.ep-emojies');

  // Set styles
  slideEl.style.transitionDuration = animationDuration + 'ms';

  const scrollListener = () => {
    const scrollHeight = emojiesContainer.scrollTop;
    const emojiesContainerChildren = Array.from(emojiesContainer.children);
    const lastVisibleContainerChild = emojiesContainerChildren
      .find(node => scrollHeight >= node.offsetTop && (!node.nextElementSibling || scrollHeight < node.nextElementSibling.offsetTop));

    const categoryId = Number(lastVisibleContainerChild.dataset.categoryId);
    slideToCategory(panelVariables, slideEl, categoryId);
  };

  categoriesEl.addEventListener('click', e => {
    if (panelVariables.isMidScrollAnimation === false) {
      let target = e.target;
      if (['cat', 'ep-c-text'].map(className => target.classList.contains(className)).some(v => v === true)) {
        target = target.parentElement;
      }
      if (target.classList.contains('ep-c')) {
        const isElementScrollable = getIsElementScrollable(emojiesContainer);
        if (isElementScrollable) {
          const categoryId = Number(target.dataset.categoryId);
          const categoryEl = emojiesContainer.querySelector(`[data-category-id="${categoryId}"]`);
          const categoryHeight = categoryEl.offsetTop;

          panelVariables.isMidScrollAnimation = true;
          // Remove scroll event listener for better performance
          emojiesContainer.removeEventListener('scroll', scrollListener);
          scrollElementTo(emojiesContainer, () => {
            panelVariables.isMidScrollAnimation = false;
            // Readd scroll event listener after javascript animation has finished
            emojiesContainer.addEventListener('scroll', scrollListener);
          }, categoryHeight, animationDuration);

          slideToCategory(panelVariables, slideEl, categoryId);
        }
      }
    }
  });

  emojiesContainer.addEventListener('scroll', scrollListener);

  if (eventListeners.onClick) {
    emojiesContainer.addEventListener('click', e => {
      const target = e.target;
      if (target.classList.contains('ep-e')) {
        const index = Number(target.dataset.index);
        const unified = target.dataset.unified;
        eventListeners.onClick({ index, unified });
      }
    });
  }
};
