import byParents from '../children/byParents';
import getSpouses from '../utils/getSpouses';
import fixOverlaps from './fixOverlaps';
import { prop, withType, flat, hasDiffParents } from '../utils';
import Store from '../store';
import Family from '../models/family';

export default (store: Store): Store => {
  let families: Family[] = [];
  const createFamily = byParents(store);

  if (hasDiffParents(store.rootNode)) {
    // Show: parents, my spouses, my siblings (for both parents)
    // Hide: another spouses for parents, half-siblings (for both parents)
    const bloodParentIDs = store.rootNode.parents
      .filter(withType('blood'))
      .map(prop('id'));

    const adoptedParentIDs = store.rootNode.parents
      .filter(withType('adopted'))
      .map(prop('id'));

    const bloodFamily = createFamily(bloodParentIDs, 'root', true);
    const adoptedFamily = createFamily(adoptedParentIDs);

    fixOverlaps(bloodFamily, adoptedFamily);
    families = [bloodFamily, adoptedFamily];
  } else {
    // Show: parents + their spouses, my siblings + half-siblings, my spouses
    const parentIDs = store.rootNode.parents.map(prop('id'));
    const mainFamily = createFamily(parentIDs, 'root', true);

    families.push(mainFamily);

    const parents = mainFamily.pUnits
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

  if (families.length > 1) {
    for (let i = 1; i < families.length; i++) {
      families[i].left = families[i - 1].right;
    }
  }

  families.forEach(family => store.families.set(family.id, family));

  return store;
};
