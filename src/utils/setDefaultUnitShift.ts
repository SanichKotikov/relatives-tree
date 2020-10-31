import Family from '../models/family';
import { min, prop } from './index';
import { arrangeParentUnit } from './arrangeParentUnit';
import { rightSide } from './units';
import { Unit } from '../types';

const arrangeInOrder = (units: readonly Unit[]): void => {
  units.forEach((unit, idx, self) => (
    unit.shift = idx === 0 ? 0 : rightSide(self[idx - 1])
  ));
};

const correctShift = (value: number) => {
  return (unit: Unit) => unit.shift += value * -1;
};

export const setDefaultUnitShift = (family: Family): void => {
  arrangeInOrder(family.pUnits);
  arrangeInOrder(family.cUnits);

  arrangeParentUnit(family);

  const start = min([
    ...family.pUnits.map(prop('shift')),
    ...family.cUnits.map(prop('shift')),
  ]);

  if (start !== 0) {
    const corrector = correctShift(start);
    family.pUnits.forEach(corrector);
    family.cUnits.forEach(corrector);
  }
};
