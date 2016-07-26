import { getIsElementScrollable, scrollElementTo, slideToCategory } from './set-events-for-template-helpers';

export default (el, { animationDuration, eventListeners } = {}) => {
  const panelVariables = {
    isMidScrollAnimation: false
  };

  const categoriesEl = el.querySelector('.ep-categories');
  const slideEl = el.querySelector('.ep-slide');
  const emojiesContainerEl = el.querySelector('.ep-emojies');

  // Set styles
  slideEl.style.transitionDuration = animationDuration + 'ms';

  const scrollListener = () => {
    const scrollHeight = emojiesContainerEl.scrollTop;
    const emojiesContainerElChildren = Array.from(emojiesContainerEl.children);
    const lastVisibleContainerChild = emojiesContainerElChildren
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
        const isElementScrollable = getIsElementScrollable(emojiesContainerEl);
        if (isElementScrollable) {
          const categoryId = Number(target.dataset.categoryId);
          const categoryEl = emojiesContainerEl.querySelector(`[data-category-id="${categoryId}"]`);
          const categoryHeight = categoryEl.offsetTop;

          panelVariables.isMidScrollAnimation = true;
          // Remove scroll event listener for better performance
          emojiesContainerEl.removeEventListener('scroll', scrollListener);
          scrollElementTo(emojiesContainerEl, () => {
            panelVariables.isMidScrollAnimation = false;
            // Readd scroll event listener after javascript animation has finished
            emojiesContainerEl.addEventListener('scroll', scrollListener);
          }, categoryHeight, animationDuration);

          slideToCategory(panelVariables, slideEl, categoryId);
        }
      }
    }
  });

  emojiesContainerEl.addEventListener('scroll', scrollListener);

  if (eventListeners.onClick) {
    emojiesContainerEl.addEventListener('click', e => {
      const target = e.target;
      if (target.classList.contains('ep-e')) {
        const index = Number(target.dataset.index);
        const unified = target.dataset.unified;
        eventListeners.onClick({ index, unified });
      }
    });
  }
};
