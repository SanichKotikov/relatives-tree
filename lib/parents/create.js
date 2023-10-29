import { byGender, prop } from '../utils';
import { arrangeInOrder, newUnit } from '../utils/units';
import { newFamily } from '../utils/family';
import { FamilyType } from '../types';
const getParentUnits = (store, unit) => unit.nodes.reduce((units, child) => {
    const parents = store.getNodes(child.parents.map(prop('id'))).sort(byGender(store.root.gender));
    if (parents.length)
        units.push(newUnit(unit.fid, parents));
    return units;
}, []);
const setDefaultUnitShift = (family) => {
    arrangeInOrder(family.children);
    arrangeInOrder(family.parents);
};
export const createFamilyFunc = (store) => {
    return (childIDs) => {
        const family = newFamily(store.getNextId(), FamilyType.parent);
        const childUnit = newUnit(family.id, store.getNodes(childIDs), true);
        family.children = [childUnit];
        family.parents = getParentUnits(store, childUnit);
        setDefaultUnitShift(family);
        return family;
    };
};
