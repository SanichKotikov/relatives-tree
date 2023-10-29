import { hasDiffParents } from '../utils';
import { rightOf } from '../utils/family';
import { createBloodFamilies, createDiffTypeFamilies, createFamilyWithoutParents } from './create';
const arrangeFamilies = (families) => {
    for (let i = 1; i < families.length; i++) {
        families[i].X = rightOf(families[i - 1]);
    }
};
export const inMiddleDirection = (store) => {
    const families = store.root.parents.length
        ? hasDiffParents(store.root)
            ? createDiffTypeFamilies(store)
            : createBloodFamilies(store)
        : createFamilyWithoutParents(store);
    arrangeFamilies(families);
    families.forEach((family) => store.families.set(family.id, family));
    return store;
};
