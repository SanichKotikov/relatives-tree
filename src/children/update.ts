import type Store from '../store';
import { SIZE } from '../constants';
import { heightOf } from '../utils/family';
import { getUnitX } from '../utils/units';
import type { Family, Unit } from '../types';

export const updateFamilyFunc = (store: Store) => (
  (family: Family, parentUnit: Unit): void => {
    const parentFamily = store.getFamily(parentUnit.fid);

    family.pid = parentFamily.id;
    family.Y = parentFamily.Y + heightOf(parentFamily) - SIZE;
    family.X = getUnitX(parentFamily, parentUnit);
  }
);
