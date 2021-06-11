import { min, prop } from './index';
import { arrangeParentsIn } from './arrangeParentsIn';
import { arrangeInOrder, correctUnitsShift } from './units';
import type { Family } from '../types';

export const setDefaultUnitShift = (family: Family): void => {
  const units = [family.parents, family.children];

  units.forEach(arrangeInOrder);
  arrangeParentsIn(family);

  const start = min(units.flat().map(prop('pos')));
  if (start !== 0) units.forEach(items => correctUnitsShift(items, start * -1));
};
