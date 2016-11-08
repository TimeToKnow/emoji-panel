import { getIsElementScrollable, scrollElementTo, slideToCategory } from 'src/set-events-for-template-helpers';
import categoryOrder from 'src/category-order';
import { CATEGORY } from 'src/constant';

describe('`set-events-for-template-helpers`', () => {
  describe('has `getIsElementScrollable` function which returns', () => {
    it('false if `clientHeight` equals `scrollHeight`', () => {
      expect(getIsElementScrollable({
        clientHeight: 12,
        scrollHeight: 12
      })).toBeFalsy();
    });
    it('true if `clientHeight` is different than `scrollHeight`', () => {
      expect(getIsElementScrollable({
        clientHeight: 200,
        scrollHeight: 12
      })).toBeTruthy();
    });
  });
  describe('has `slideToCategory` function', () => {
    let panelVariables;
    let slideEl;
    beforeEach(() => {
      panelVariables = {
        selectedCategoryId: categoryOrder[0]
      };
      slideEl = {
        style: {
          marginLeft: '0%'
        }
      };
    });
    it('that does nothing if categoryId matches the `panelVariables.selectedCategoryId`', () => {
      slideToCategory(panelVariables, slideEl, categoryOrder[0]);
      expect(panelVariables.selectedCategoryId).toBe(categoryOrder[0]);
      expect(slideEl.style.marginLeft).toBe('0%');
    });
    it('that changes `panelVariables.selectedCategoryId` and `slideEl.style.marginLeft` (based on how many categories there are) if given differentCategoryId', () => {
      const indexOfNewCatergyId = 3;
      const newCategoryId = categoryOrder[indexOfNewCatergyId];
      slideToCategory(panelVariables, slideEl, newCategoryId);
      expect(panelVariables.selectedCategoryId).toBe(newCategoryId);
      expect(slideEl.style.marginLeft).toBe(`${(indexOfNewCatergyId / categoryOrder.length) * 100}%`);
    });
  });
  describe('has `scrollElementTo` function that does scroll animation', () => {
    let funcArray;
    /**
     * Loops through funcArray and runs all of the functions
     */
    const runFuncArray = fn => {
      let i = 0;
      while (i < funcArray.length) {
        funcArray[i]();
        // Middleware function
        if (fn) {
          fn();
        }
        i++;
      }
    };
    /**
     * beforeEach sets resets array to empty, and each time raf called, adds them to the array to be run by `runFuncArray`
     */
    beforeEach(() => {
      funcArray = [];
      spyOn(window, 'requestAnimationFrame').and.callFake(fn => {
        funcArray.push(fn);
      });
    });
    it('`done` is called once', () => {
      const doneSpy = jasmine.createSpy('done');
      scrollElementTo({
        scrollTop: 0
      }, doneSpy, 300);
      runFuncArray();
      expect(doneSpy).toHaveBeenCalledTimes(1);
    });
    it('step function is called every 15ms', () => {
      const animationTime = 310;
      const timesStepShouldBeCalled = Math.floor(animationTime / 15) + 1;// Plus one for initial `requestAnimationFrame`
      spyOn(Date, 'now').and.returnValues(...Array.from({ length: timesStepShouldBeCalled }).map((_, index) => 15 * index));

      let doneCalled = false;
      scrollElementTo({
        scrollTop: 0
      }, () => {
        doneCalled = true;
      }, 1000, animationTime);
      runFuncArray();

      if (doneCalled) {
        expect(window.requestAnimationFrame).toHaveBeenCalledTimes(timesStepShouldBeCalled - 1);
      } else {
        fail('Expected done callback to be called');
      }
    });
  });
});
