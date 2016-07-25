import setInjector from 'inject!src/set';
import emojiDataMock from 'test/mock/emoji-data';
import categoryOrder from 'src/category-order';
import { IMAGE_SET, SIZE } from 'src/constant';
import Map from 'src/map';
const set = setInjector({
  './emoji-data': emojiDataMock
});

describe('set function', () => {
  it('calls `api.add` once with css object', () => {
    const api = {  add: () => {} };
    spyOn(api, 'add').and.callFake(obj => {

      // flatten emoji-data object array to single array, filter out categories not in `categoryOrder`
      const emojiesToAddToCss = Object.keys(emojiDataMock).reduce((arr, catStr) => {
        const cat = Number(catStr);
        if (categoryOrder.indexOf(cat) !== -1) {
          return arr.concat(emojiDataMock[cat]);
        } else {
          // Filter out categories not in `categoryOrder`
          return arr;
        }
      }, []);

      // Get all the css rules with class="ep-e" and attribute "data-index"
      const emojiesCssRules = Object.keys(obj).filter(key => key.match(/\.ep-e\[data-index="[0-9]{1,}"\]/g));

      // Should be the same length
      expect(emojiesCssRules.length).toBe(emojiesToAddToCss.length);
    });
    set(api, IMAGE_SET.APPLE, SIZE['64']);
    expect(api.add).toHaveBeenCalledTimes(1);
  });
  describe('for different imageSets and sizes will return different backgroundUrl', () => {
    const getImageFileLocation = (imageSet, size) => {
      let sizeStr;
      switch (size) {
      case SIZE['16']:
        sizeStr = '16';
        break;
      case SIZE['20']:
        sizeStr = '20';
        break;
      case SIZE['32']:
        sizeStr = '32';
        break;
      case SIZE['64']:
        sizeStr = '64';
        break;
      }
      let imageSetStr;
      switch (imageSet) {
      case IMAGE_SET.APPLE:
        imageSetStr = 'apple';
        break;
      case IMAGE_SET.GOOGLE:
        imageSetStr = 'google';
        break;
      case IMAGE_SET.TWITTER:
        imageSetStr = 'twitter';
        break;
      case IMAGE_SET.EMOJIONE:
        imageSetStr = 'emojione';
        break;
      }
      return `~emoji-datasource/sheet_${imageSetStr}_${sizeStr}.png`;
    };
    let options = [];
    Object.keys(IMAGE_SET).forEach(imageSetKey => {
      const imageSet = IMAGE_SET[imageSetKey];
      Object.keys(SIZE).forEach(sizeKey => {
        const size = SIZE[sizeKey];
        options = options.concat({
          imageSetKey,
          imageSet,
          sizeKey,
          size,
          expectedBackground: `url('${getImageFileLocation(imageSet, size)}')`
        });
      });
    });
    options.forEach(option => {
      const { imageSetKey, imageSet, sizeKey, size, expectedBackground } = option;
      it(`imageSet - ${imageSetKey} and size - ${sizeKey}`, () => {
        const api = {  add: () => {} };
        spyOn(api, 'add').and.callFake(obj => {
          expect(obj['.ep-e']['background-image']).toBe(expectedBackground);
        });
        set(api, imageSet, size);
        expect(api.add).toHaveBeenCalledTimes(1);
      });
    });
  });
});
