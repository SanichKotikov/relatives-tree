import { min, prop } from './index';
import { arrangeInOrder, correctUnitsShift } from './units';
import { unitNodesCount } from './family';
import type { Family } from '../types';

const arrangeUnitsIn = (family: Family): void => {
  const diff = unitNodesCount(family.parents) - unitNodesCount(family.children);
  if (diff === 0) return;
  if (diff > 0) correctUnitsShift(family.children, diff);
  else correctUnitsShift(family.parents, Math.abs(diff));
};

export const setDefaultUnitShift = (family: Family): void => {
  const units = [family.parents, family.children];

  units.forEach(arrangeInOrder);
  arrangeUnitsIn(family);

  const start = min(units.flat().map(prop('pos')));
  if (start !== 0) units.forEach(items => correctUnitsShift(items, start * -1));
};
