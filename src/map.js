import { IMAGE_SET, SIZE, CATEGORY } from './constant';

export const categoryDataMap = {
  Activity: CATEGORY.ACTIVITY,
  Flags: CATEGORY.FLAGS,
  Foods: CATEGORY.FOODS,
  Nature: CATEGORY.NATURE,
  Objects: CATEGORY.OBJECTS,
  People: CATEGORY.PEOPLE,
  Places: CATEGORY.PLACES,
  Symbols: CATEGORY.SYMBOLS,
  null: CATEGORY.OTHER
};

export const categoryNameMap = {
  [CATEGORY.ACTIVITY]: 'ACTIVITY',
  [CATEGORY.FLAGS]: 'FLAGS',
  [CATEGORY.FOODS]: 'FOOD & DRINK',
  [CATEGORY.NATURE]: 'ANIMALS & NATURE',
  [CATEGORY.OBJECTS]: 'OBJECTS',
  [CATEGORY.PEOPLE]: 'SMILEYS & PEOPLE',
  [CATEGORY.PLACES]: 'TRAVEL & PLACES',
  [CATEGORY.SYMBOLS]: 'SYMBOLS',
  [CATEGORY.OTHER]: 'OTHER'
};

export const sizeMap = {
  '0': 16,
  '1': 20,
  '2': 32,
  '4': 64
};
