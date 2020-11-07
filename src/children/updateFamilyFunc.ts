import Store from '../store';
import { SIZE } from '../constants';
import { heightOf } from '../utils/family';
import { Family, Unit } from '../types';

export const updateFamilyFunc = (store: Store) => (
  (family: Family, parentUnit: Unit): void => {
    const parentFamily = store.getFamily(parentUnit.fid);

    family.pid = parentFamily.id;
    family.Y = parentFamily.Y + heightOf(parentFamily) - SIZE;
    family.X = parentFamily.X + parentUnit.pos;
  }
);
