import { withType } from '../utils/family';
import { hasChildren, nodeIds } from '../utils/units';
import { FamilyType } from '../types';
import { createFamilyFunc } from './create';
import { updateFamilyFunc } from './update';
import { arrangeFamiliesFunc } from './arrange';
const getUnitsWithChildren = (family) => family.children.filter(hasChildren).reverse();
export const inChildDirection = (store) => {
    const createFamily = createFamilyFunc(store);
    const updateFamily = updateFamilyFunc(store);
    const arrangeFamilies = arrangeFamiliesFunc(store);
    store.familiesArray.filter(withType(FamilyType.root)).forEach((rootFamily) => {
        let stack = getUnitsWithChildren(rootFamily);
        while (stack.length) {
            const parentUnit = stack.pop();
            const family = createFamily(nodeIds(parentUnit), FamilyType.child);
            updateFamily(family, parentUnit);
            arrangeFamilies(family);
            store.families.set(family.id, family);
            stack = stack.concat(getUnitsWithChildren(family));
        }
    });
    return store;
};
