import { IMAGE_SET, SIZE } from 'src/constant';

const getImageSetFromStr = imageSetStr => {
  switch (imageSetStr) {
  case 'apple':
    return IMAGE_SET.APPLE;
  case 'emojione':
    return IMAGE_SET.EMOJIONE;
  case 'twitter':
    return IMAGE_SET.TWITTER;
  case 'google':
    return IMAGE_SET.GOOGLE;
  }
};

const getSizeFromStr = sizeStr => {
  switch (sizeStr) {
  case '16':
    return SIZE['16'];
  case '20':
    return SIZE['20'];
  case '32':
    return SIZE['32'];
  case '64':
    return SIZE['64'];
  }
};

describe('Each set should call \'setBase\' with imageSet and size by it\'s name - ', () => {
  // `require` is undefined because we usually use es6 imports.
  // Only when using dynamic importing we use require - which is the case right here
  // eslint-disable-next-line no-undef
  const setFilesContext = require.context('inject!src/sets/', true, /\.js$/);

  setFilesContext.keys().forEach(fileName => {
    const setInjector = setFilesContext(fileName);
    it(`'${fileName}'`, () => {
      const api = {};
      const setBaseSpy = jasmine.createSpy();
      const set = setInjector({
        '../set': setBaseSpy
      });
      const fileNameMatch = fileName.match(/([\w]{1,})-([\w]{1,})\.acss\.js/);
      const imageSetStr = fileNameMatch[1];
      const imageSet = getImageSetFromStr(imageSetStr);
      const sizeStr = fileNameMatch[2];
      const size = getSizeFromStr(sizeStr);

      set(api);
      expect(setBaseSpy).toHaveBeenCalledTimes(1);
      expect(setBaseSpy).toHaveBeenCalledWith(api, imageSet, size);
    });
  });
});
