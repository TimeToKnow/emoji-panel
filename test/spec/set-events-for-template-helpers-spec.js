import { getIsElementScrollable, round, scrollElementTo, slideToCategory } from 'src/set-events-for-template-helpers';
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
  describe('has `round` function', () => {
    it('that rounds up numbers', () => {
      expect(round(1.77)).toBe(2);
    });
    it('that rounds down numbers', () => {
      expect(round(1.12)).toBe(1);
    });
    describe('that rounds to half', () => {
      it('when is half', () => {
        expect(round(1.5)).toBe(1.5);
      });
      it('when is bellow half but closer to half than whole number', () => {
        expect(round(1.32)).toBe(1.5);
      });
      it('when is higher than half but closer to half than whole number', () => {
        expect(round(1.72)).toBe(1.5);
      });
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
     * beforeEach sets resets array to empty, and each time raf or setTimeout is called, adds them to the array to be run by `runFuncArray`
     */
    beforeEach(() => {
      funcArray = [];
      spyOn(window, 'setTimeout').and.callFake(fn => {
        funcArray.push(fn);
      });
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
      const timesStepShouldBeCalled = Math.ceil(animationTime / 15);
      scrollElementTo({
        scrollTop: 0
      }, () => {}, animationTime);
      runFuncArray();
      expect(window.setTimeout).toHaveBeenCalledTimes(timesStepShouldBeCalled);
    });
  });
});
