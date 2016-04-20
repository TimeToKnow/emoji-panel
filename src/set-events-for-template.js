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
        el.scrollTo(0, scrollHeight - scrollMargin);
      } else {
        done();
      }
    }, 15);
  };

  requestAnimationFrame(step);
};
export default (el, callback) => {
  let isMidScrollAnimation = false;

  const categoriesEl = el.querySelector('.ep-categories');
  const emojiesContainer = el.querySelector('.ep-emojies');
  categoriesEl.addEventListener('click', e => {
    if (isMidScrollAnimation === false) {
      const target = e.target;
      if (target.classList.contains('ep-c')) {
        const isElementScrollable = getIsElementScrollable(emojiesContainer);
        if (isElementScrollable) {
          const categoryId = target.dataset.categoryId;
          const categoryEl = emojiesContainer.querySelector(`[data-category-id="${categoryId}"]`);
          const categoryHeight = categoryEl.offsetTop;
          isMidScrollAnimation = true;
          scrollElementTo(emojiesContainer, () => {
            isMidScrollAnimation = false;
          }, categoryHeight);
        }
      }
    }
  });
};
