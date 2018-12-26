import byParents from '../children/byParents';
import getSpouses from '../utils/getSpouses';
import fixOverlaps from './fixOverlaps';
import hasDiffParents from '../utils/hasDiffParents';
import Store from '../store';
import Family from '../models/family';

export default (store: Store): void => {
  let families: Family[] = [];

  if (hasDiffParents(store.rootNode)) {
    // Show: parents, my spouses, my siblings (for both parents)
    // Hide: another spouses for parents, half-siblings (for both parents)
    const bloodParentIDs = store.rootNode.parents
      .filter(rel => rel.type === 'blood')
      .map(rel => rel.id);

    const adoptedParentIDs = store.rootNode.parents
      .filter(rel => rel.type === 'adopted')
      .map(rel => rel.id);

    const bloodFamily = byParents(store, bloodParentIDs, 'root', true);
    const adoptedFamily = byParents(store, adoptedParentIDs);

    fixOverlaps(bloodFamily, adoptedFamily);
    families = [bloodFamily, adoptedFamily];
  } else {
    // Show: parents + their spouses, my siblings + half-siblings, my spouses
    const parentIDs = store.rootNode.parents.map(rel => rel.id);
    const mainFamily = byParents(store, parentIDs, 'root', true);

    families.push(mainFamily);

    const parents = mainFamily.pUnits
      .map(unit => unit.nodes)
      .reduce((all, next) => all.concat(next), []);

    if (parents.length === 2) {
      const spouses = getSpouses(store, parents);

      if (spouses) {
        families = [
          ...spouses.left.map(node => byParents(store, [node.id])),
          ...families,
          ...spouses.right.map(node => byParents(store, [node.id])),
        ];
      }
    }
  }

  if (families.length > 1) {
    for (let i = 1; i < families.length; i++) {
      families[i].left = families[i - 1].left + families[i - 1].width;
    }
  }

  families.forEach(family => store.families.set(family.id, family));
};
