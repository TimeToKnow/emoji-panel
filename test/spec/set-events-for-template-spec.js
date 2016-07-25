import setEventsForTemplateInjector from 'inject!src/set-events-for-template';
import categoryOrder from 'src/category-order';
const animationDuration = 300;

describe('`set-events-for-template`', () => {
  let el;
  let categoriesEl;
  let slideEl;
  let emojiesContainerEl;
  let setEventsForTemplate;
  let slideToCategorySpy;
  let scrollElementToSpy;
  let getIsElementScrollableSpy;
  let fireScrollToDone;
  beforeEach(() => {
    slideToCategorySpy = jasmine.createSpy('slideToCategorySpy');
    fireScrollToDone = () => { scrollElementToDone(); };
    let scrollElementToDone;
    scrollElementToSpy = jasmine.createSpy('scrollElementToSpy').and.callFake((el, done) => { scrollElementToDone = done; });
    getIsElementScrollableSpy = jasmine.createSpy('getIsElementScrollableSpy').and.returnValue(true);
    setEventsForTemplate = setEventsForTemplateInjector({
      './set-events-for-template-helpers': {
        slideToCategory: slideToCategorySpy,
        scrollElementTo: scrollElementToSpy,
        getIsElementScrollable: getIsElementScrollableSpy
      }
    }).default;
    categoriesEl = {
      addEventListener: () => {}
    };
    slideEl = {
      style: {}
    };
    // Set emojiesContainerEl to have some properties used in scroll event
    emojiesContainerEl = {
      addEventListener: () => {},
      removeEventListener: () => {},
      querySelector: () => {},
      children: categoryOrder
      .map((categoryId, i) => ({
        offsetTop: 200 * i,
        dataset: {
          categoryId
        }
      }))
      .map((x, i, arr) => {
        x.nextElementSibling = arr[i + 1];
        return x;
      })
    };
    el = {
      querySelector: query => {
        switch (query) {
        case '.ep-categories':
          return categoriesEl;
        case '.ep-slide':
          return slideEl;
        case '.ep-emojies':
          return emojiesContainerEl;
        }
      }
    };
  });
  it('should find elements to set events to from given element by className', () => {
    const eventListeners = {};
    spyOn(el, 'querySelector').and.callThrough();
    setEventsForTemplate(el, { animationDuration, eventListeners });
    expect(el.querySelector.calls.allArgs()).toEqual([['.ep-categories'], ['.ep-slide'], ['.ep-emojies']]);
  });
  describe('should add `click` event to categoriesEl', () => {
    it('once', () => {
      const eventListeners = {};
      spyOn(categoriesEl, 'addEventListener');
      setEventsForTemplate(el, { animationDuration, eventListeners });
      expect(categoriesEl.addEventListener).toHaveBeenCalledTimes(1);
      expect(categoriesEl.addEventListener.calls.argsFor(0)).toEqual(['click', jasmine.any(Function)]);
    });
    describe('which fires an event that', () => {
      let event;
      const fireEvent = e => {
        event(e);
      };
      const eventListeners = {};
      beforeEach(() => {
        spyOn(categoriesEl, 'addEventListener').and.callFake((eventType, eventHanler) => {
          event = eventHanler;
        });
        setEventsForTemplate(el, { animationDuration, eventListeners });
      });
      it('does nothing if target class is not category\'s icon', () => {
        spyOn(emojiesContainerEl, 'querySelector').and.returnValue({});
        fireEvent({
          target: document.createElement('span')
        });
        expect(emojiesContainerEl.querySelector).not.toHaveBeenCalled();
      });
      it('continues if icon is clicked', () => {
        const catEl = document.createElement('span');
        catEl.setAttribute('class', 'ep-c');
        catEl.setAttribute('data-category-id', '2');
        const catIconEl = document.createElement('span');
        catIconEl.setAttribute('class', 'cat');
        catEl.appendChild(catIconEl);
        spyOn(emojiesContainerEl, 'querySelector').and.returnValue({});
        fireEvent({
          target: catIconEl
        });
        expect(emojiesContainerEl.querySelector).toHaveBeenCalledTimes(1);
      });
      it('continues if category is clicked', () => {
        const catEl = document.createElement('span');
        catEl.setAttribute('class', 'ep-c');
        catEl.setAttribute('data-category-id', '2');
        spyOn(emojiesContainerEl, 'querySelector').and.returnValue({});
        fireEvent({
          target: catEl
        });
        expect(emojiesContainerEl.querySelector).toHaveBeenCalledTimes(1);
      });
      it('removes `scroll` event from emojis and then returns it', () => {
        const catEl = document.createElement('span');
        catEl.setAttribute('class', 'ep-c');
        catEl.setAttribute('data-category-id', '2');
        spyOn(emojiesContainerEl, 'querySelector').and.returnValue({});
        spyOn(emojiesContainerEl, 'addEventListener');
        spyOn(emojiesContainerEl, 'removeEventListener');
        fireEvent({
          target: catEl
        });
        expect(emojiesContainerEl.removeEventListener).toHaveBeenCalledTimes(1);
        expect(emojiesContainerEl.addEventListener).not.toHaveBeenCalled();
        fireScrollToDone(); // Animation end
        expect(emojiesContainerEl.addEventListener).toHaveBeenCalledTimes(1);
      });
      it('will not call `slideToCategory` and `scrollElementTo` twice (or more) in a row (if clicks before animation ends)', () => {
        const catEl = document.createElement('span');
        catEl.setAttribute('class', 'ep-c');
        catEl.setAttribute('data-category-id', '2');
        spyOn(emojiesContainerEl, 'querySelector').and.returnValue({});
        fireEvent({
          target: catEl
        });
        fireEvent({
          target: catEl
        });
        expect(scrollElementToSpy).toHaveBeenCalledTimes(1);
        expect(slideToCategorySpy).toHaveBeenCalledTimes(1);
      });
      it('will call `slideToCategory` and `scrollElementTo` with currect parameters', () => {
        const catEl = document.createElement('span');
        catEl.setAttribute('class', 'ep-c');
        const categoryId = 2;
        catEl.setAttribute('data-category-id', categoryId);
        const newOffset = 200;
        spyOn(emojiesContainerEl, 'querySelector').and.returnValue({ offsetTop: newOffset });
        fireEvent({
          target: catEl
        });
        expect(scrollElementToSpy).toHaveBeenCalledWith(emojiesContainerEl, jasmine.any(Function), newOffset, animationDuration);
        expect(slideToCategorySpy).toHaveBeenCalledWith(jasmine.any(Object), slideEl, categoryId);
      });
    });
  });
  describe('should addEvents to emoji - ', () => {
    it('once when no `onClick` given', () => {
      const eventListeners = {};
      spyOn(emojiesContainerEl, 'addEventListener');
      setEventsForTemplate(el, { animationDuration, eventListeners });
      expect(emojiesContainerEl.addEventListener).toHaveBeenCalledTimes(1);
      expect(emojiesContainerEl.addEventListener.calls.argsFor(0)).toEqual(['scroll', jasmine.any(Function)]);
    });
    it('twice, once with `scroll`, second time with `click` when `onClick` given', () => {
      const eventListeners = { onClick: () => {} };
      spyOn(emojiesContainerEl, 'addEventListener');
      setEventsForTemplate(el, { animationDuration, eventListeners });
      expect(emojiesContainerEl.addEventListener).toHaveBeenCalledTimes(2);
      expect(emojiesContainerEl.addEventListener.calls.argsFor(0)).toEqual(['scroll', jasmine.any(Function)]);
      expect(emojiesContainerEl.addEventListener.calls.argsFor(1)).toEqual(['click', jasmine.any(Function)]);
    });
    describe('scroll event ', () => {
      const fireEvent = e => { event(e); };
      let event;
      beforeEach(() => {
        const eventListeners = {};
        spyOn(emojiesContainerEl, 'addEventListener').and.callFake((eventType, eventHanler) => {
          if (eventType === 'scroll') {
            event = eventHanler;
          }
        });
        setEventsForTemplate(el, { animationDuration, eventListeners });
      });
      it('should scroll to first category for 0 scrollTop', () => {
        emojiesContainerEl.scrollTop = 0;
        fireEvent();
        expect(slideToCategorySpy).toHaveBeenCalledWith(jasmine.any(Object), slideEl, categoryOrder[0]);
      });
      it('should scroll to last category for scrollTop higher then any other offsetTop', () => {
        emojiesContainerEl.scrollTop = 8000;
        fireEvent();
        expect(slideToCategorySpy).toHaveBeenCalledWith(jasmine.any(Object), slideEl, categoryOrder[categoryOrder.length - 1]);
      });
      it('should scroll to category for offsetTop equals to the scrollTop', () => {
        emojiesContainerEl.scrollTop = 200;
        fireEvent();
        expect(slideToCategorySpy).toHaveBeenCalledWith(jasmine.any(Object), slideEl, categoryOrder[1]);
      });
      it('should scroll to the lower category that is between to categories based on scrollTop', () => {
        emojiesContainerEl.scrollTop = 300; // between 200 and 400, should choose category with 200
        fireEvent();
        expect(slideToCategorySpy).toHaveBeenCalledWith(jasmine.any(Object), slideEl, categoryOrder[1]);
      });
    });
    describe('click event ', () => {
      const eventListeners = { onClick: () => {} };
      const fireEvent = e => { event(e); };
      let event;
      beforeEach(() => {
        spyOn(emojiesContainerEl, 'addEventListener').and.callFake((eventType, eventHanler) => {
          if (eventType === 'click') {
            event = eventHanler;
          }
        });
        setEventsForTemplate(el, { animationDuration, eventListeners });
      });
      it('should not call `onClick` if target is not an emoji (some other element in emoji container)', () => {
        const span = document.createElement('span');
        spyOn(eventListeners, 'onClick');
        fireEvent({
          target: span
        });
        expect(eventListeners.onClick).not.toHaveBeenCalled();
      });
      it('should call `onClick` if target is an emoji (class="ep-e") and return "data-index" as number and "data-unified"', () => {
        const span = document.createElement('span');
        const index = 123;
        const unified = 'yuval';
        span.setAttribute('class', 'ep-e');
        span.setAttribute('data-index', index);
        span.setAttribute('data-unified', unified);
        spyOn(eventListeners, 'onClick');
        fireEvent({
          target: span
        });
        expect(eventListeners.onClick).toHaveBeenCalledTimes(1);
        expect(eventListeners.onClick).toHaveBeenCalledWith({ index, unified });
      });
    });
  });
});
