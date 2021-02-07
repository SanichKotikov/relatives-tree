import { min, prop } from './index';
import { arrangeParentsIn } from './arrangeParentsIn';
import { rightSide } from './units';
import { Family, Unit } from '../types';

const arrangeInOrder = (units: readonly Unit[]): void => {
  units.forEach((unit, idx, self) => (
    unit.pos = idx === 0 ? 0 : rightSide(self[idx - 1])
  ));
};

const correctShift = (value: number) => {
  return (unit: Unit) => unit.pos += value * -1;
};

export const setDefaultUnitShift = (family: Family): void => {
  arrangeInOrder(family.parents);
  arrangeInOrder(family.children);

  arrangeParentsIn(family);

  const start = min([
    ...family.parents.map(prop('pos')),
    ...family.children.map(prop('pos')),
  ]);

  if (start !== 0) {
    const corrector = correctShift(start);
    family.parents.forEach(corrector);
    family.children.forEach(corrector);
  }
};
