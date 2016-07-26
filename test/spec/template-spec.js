import templateInjector from 'inject!src/template.ahtml';
import categoryOrder from 'src/category-order';
import { CATEGORY } from 'src/constant';
import emojiDataMock from 'test/mock/emoji-data';
const template = templateInjector({
  './emoji-data': emojiDataMock
});

describe('template.ahtml returns a function that produces html', () => {
  it('that calls `api.morph(\'html\').add` once with html object', () => {
    let morphCount = 0;
    let addCount = 0;
    const api = {
      morph: morphType => {
        expect(morphType).toBe('html');
        morphCount++;
        if (morphCount !== 1) {
          fail(`'morph' function was called other than once, was called ${morphCount} times.`);
        }
        return {
          add: htmlObject => {
            addCount++;
            if (addCount !== 1) {
              fail(`'add' function was called other than once, was called ${addCount} times.`);
            }
            expect(htmlObject).toEqual(jasmine.any(Object));
          }
        };
      }
    };
    template(api);
  });
  it('with a slider at the same container as the categories', () => {
    const api = {
      morph: () => ({
        add: htmlObject => {
          const categoriesContainerChildren = htmlObject['div[class="ep"]']['div[class="ep-categories"]'];
          const sliderObject = categoriesContainerChildren[0]; // First index is slider
          const sliderElementNames = Object.keys(sliderObject);
          expect(sliderElementNames.length).toBe(1); // Slider is 1 element only
          expect(sliderElementNames[0]).toBe('span[class="ep-slide"]');
        }
      })
    };
    template(api);
  });
  it('with categories in the order of `category-order`', () => {
    const api = {
      morph: () => ({
        add: htmlObject => {
          const categoriesContainerChildren = htmlObject['div[class="ep"]']['div[class="ep-categories"]'];
          const categoriesSpansOnly = categoriesContainerChildren[1]; // First index is slider
          const categoriesSpanNamesOnly = Object.keys(categoriesSpansOnly);
          const categoriesValuesFromSpans = categoriesSpanNamesOnly.map(spanElement => {
            expect(spanElement).toEqual(jasmine.stringMatching(/^span\[class="ep-c" data-category-id="(\d{1,})"\]$/));
            const categoryStringValue = spanElement.match(/^span\[class="ep-c" data-category-id="(\d{1,})"\]$/)[1];
            const categoryValue = Number(categoryStringValue);
            return categoryValue;
          });
          expect(categoriesValuesFromSpans).toEqual(categoryOrder);
        }
      })
    };
    template(api);
  });
  it('emojies in the order of `emoji-data` each in category order by `category-order`', () => {
    const api = {
      morph: () => ({
        add: htmlObject => {
          const emojisContainer = htmlObject['div[class="ep"]']['div[class="ep-emojies"]'];
          const emojiCategoryDivNames = Object.keys(emojisContainer);

          const constructedEmojiDataFromHtml = emojiCategoryDivNames.reduce((obj, categoryDivElement) => {
            expect(categoryDivElement).toEqual(jasmine.stringMatching(/^div\[class="ep-emojies-c" data-category-id="(\d{1,})"\]$/));
            const categoryStringValue = categoryDivElement.match(/^div\[class="ep-emojies-c" data-category-id="(\d{1,})"\]$/)[1];
            const categoryValue = Number(categoryStringValue);
            return Object.assign(obj, {
              [categoryValue]: Object.keys(emojisContainer[categoryDivElement]).map(emojiSpanName => {
                expect(emojiSpanName).toEqual(jasmine.stringMatching(/^span\[class="ep-e" data-index="(\d{1,})" data-unified="(\w{1,})"\]$/));
                const emojiMathValues = emojiSpanName.match(/^span\[class="ep-e" data-index="(\d{1,})" data-unified="(\w{1,})"\]$/);
                const index = Number(emojiMathValues[1]);
                const unified = emojiMathValues[2];
                return { index, unified };
              })
            });
          }, {});

          expect(constructedEmojiDataFromHtml).toEqual(emojiDataMock);
        }
      })
    };
    template(api);
  });
});
