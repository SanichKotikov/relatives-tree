import { min, prop } from './index';
import { arrangeParentsIn } from './arrangeParentsIn';
import { arrangeInOrder, correctUnitsShift } from './units';
import { Family } from '../types';

export const setDefaultUnitShift = (family: Family): void => {
  arrangeInOrder(family.parents);
  arrangeInOrder(family.children);

  arrangeParentsIn(family);

  const start = min([...family.parents, ...family.children].map(prop('pos')));
  if (start !== 0) [family.parents, family.children].forEach(units => correctUnitsShift(units, start * -1));
};
