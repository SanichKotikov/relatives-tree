import { Family } from '../types';

export const arrangeMiddle = (families: Family[], start: number = 1, left: number = 0): void => {
  if (families.length >= start + 1) {
    const shift = left - families[start].X;

    for (let i = start; i < families.length; i++) {
      families[i].X += shift;
    }
  }
};
