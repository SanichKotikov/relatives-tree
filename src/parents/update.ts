import type Store from '../store';
import { SIZE } from '../constants';
import { getUnitX } from '../utils/units';
import type { Family, Unit } from '../types';

export const updateFamilyFunc = (store: Store) => (
  (family: Family, childUnit: Unit): void => {
    const childFamily = store.getFamily(childUnit.fid);

    family.cid = childFamily.id;
    family.Y = childFamily.Y - SIZE;
    family.X = getUnitX(childFamily, childUnit);
  }
);
