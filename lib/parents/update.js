import { SIZE } from '../constants';
import { getUnitX } from '../utils/units';
export const updateFamilyFunc = (store) => (family, childUnit) => {
    const childFamily = store.getFamily(childUnit.fid);
    family.cid = childFamily.id;
    family.Y = childFamily.Y - SIZE;
    family.X = getUnitX(childFamily, childUnit);
};
