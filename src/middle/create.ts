import getChildUnits from '../children/getChildUnits';
import byParents from '../children/byParents';
import getSpouses from '../utils/getSpouses';
import fixOverlaps from './fixOverlaps';
import { setDefaultUnitShift } from '../utils/setDefaultUnitShift';
import { flat, hasDiffParents, prop, withType } from '../utils';
import { fRight, newFamily } from '../utils/family';
import Store from '../store';
import { Family, FamilyType } from '../types';

export default (store: Store): Store => {
  const rootParents = store.root.parents;
  let families: Family[] = [];

  if (!rootParents.length) {
    const family = newFamily(store.getNextId(), FamilyType.root, true);
    getChildUnits(store, family.id, store.root).forEach(unit => family.children.push(unit));
    setDefaultUnitShift(family);
    families.push(family);
  }
  else {
    const createFamily = byParents(store);

    if (hasDiffParents(store.root)) {
      // Show: parents, my spouses, my siblings (for both parents)
      // Hide: another spouses for parents, half-siblings (for both parents)
      const bloodParentIDs = rootParents
        .filter(withType('blood'))
        .map(prop('id'));

      const adoptedParentIDs = rootParents
        .filter(withType('adopted'))
        .map(prop('id'));

      const bloodFamily = createFamily(bloodParentIDs, FamilyType.root, true);
      const adoptedFamily = createFamily(adoptedParentIDs);

      fixOverlaps(bloodFamily, adoptedFamily);
      families = [bloodFamily, adoptedFamily];
    }
    else {
      // Show: parents + their spouses, my siblings + half-siblings, my spouses
      const parentIDs = rootParents.map(prop('id'));
      const mainFamily = createFamily(parentIDs, FamilyType.root, true);

      families.push(mainFamily);

      const parents = mainFamily.parents
        .map(prop('nodes'))
        .reduce(flat);

      if (parents.length === 2) {
        const { left, right } = getSpouses(store, parents);
        families = [
          ...left.map(node => createFamily([node.id])),
          ...families,
          ...right.map(node => createFamily([node.id])),
        ];
      }
    }
  }

  if (families.length > 1) {
    for (let i = 1; i < families.length; i++) {
      families[i].left = fRight(families[i - 1]);
    }
  }

  families.forEach(family => store.families.set(family.id, family));

  return store;
};
