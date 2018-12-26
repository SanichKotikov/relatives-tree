import Family from '../models/family';

export default (families: Family[], start: number = 1, left: number = 0): void => {
  if (families.length >= start + 1) {
    const shift = left - families[start].left;

    for (let i = start; i < families.length; i++) {
      families[i].left += shift;
    }
  }
};
