import categoryOrder from 'src/category-order';
import { CATEGORY } from 'src/constant';

describe('categoryOrder', () => {
  it('should have all categories, and not more than once', () => {
    const categoryValues = Object.keys(CATEGORY).map(key => CATEGORY[key]);
    const sortedCategoryValues = categoryValues.sort((a, b) => a - b);
    const sortedCategoryOrder = categoryOrder.sort((a, b) => a - b);

    expect(sortedCategoryValues).toEqual(sortedCategoryOrder);
  });
});
