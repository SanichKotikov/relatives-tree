import { nodeIds } from '../utils/units';
import { createFamilyFunc } from './create';
import { updateFamilyFunc } from './update';
import { arrangeFamiliesFunc } from './arrange';
const getParentUnitsWithParents = (family) => family.parents.filter((unit) => unit.nodes.some((node) => !!node.parents.length));
export const inParentDirection = (store) => {
    const createFamily = createFamilyFunc(store);
    const updateFamily = updateFamilyFunc(store);
    const arrangeFamily = arrangeFamiliesFunc(store);
    let stack = getParentUnitsWithParents(store.rootFamily);
    while (stack.length) {
        const childUnit = stack.pop();
        const family = createFamily(nodeIds(childUnit));
        updateFamily(family, childUnit);
        arrangeFamily(family);
        store.families.set(family.id, family);
        stack = stack.concat(getParentUnitsWithParents(family).reverse());
    }
    return store;
};
