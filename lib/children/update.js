import { SIZE } from '../constants';
import { heightOf } from '../utils/family';
import { getUnitX } from '../utils/units';
export const updateFamilyFunc = (store) => (family, parentUnit) => {
    const parentFamily = store.getFamily(parentUnit.fid);
    family.pid = parentFamily.id;
    family.Y = parentFamily.Y + heightOf(parentFamily) - SIZE;
    family.X = getUnitX(parentFamily, parentUnit);
};
