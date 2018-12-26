import Store from '../store';
import Family from '../models/family';
import Unit from '../models/unit';
import getSpouses from '../utils/getSpouses';
import setUnitDefShifts from '../utils/setUnitDefShifts';
import { FamilyType, IFamilyNode } from '../types';

export default (store: Store, parentIDs: string[], type: FamilyType = 'root', isMain: boolean = false): Family => {
  const family = new Family(store.getNextId(), type, isMain);

  const parents = family.main
    ? parentIDs.map(id => store.getNode(id)).sort((a, b) => (b.gender !== store.gender) ? -1 : 0)
    : parentIDs.map(id => store.getNode(id));

  family.pUnits.push(new Unit(family.id, parents));

  // CHILDREN
  let children: IFamilyNode[] = [];

  if (parents.length === 1) {
    children = parents[0].children
      .map(link => store.getNode(link.id));
  } else {
    const firstParent = parents[0];
    const secondParent = parents[1];

    children = firstParent.children
      .filter(fLink => secondParent.children.find(sLink => sLink.id === fLink.id))
      .map(link => store.getNode(link.id));
  }

  // CHILDREN's SPOUSES
  children.forEach(child => {
    if (child.spouses.length) {
      const spouses = getSpouses(store, [child]);
      if (spouses) {
        [...spouses.left.map(node => [node]), spouses.target, ...spouses.right.map(node => [node])]
          .forEach(nodes => family.cUnits.push(new Unit(family.id, nodes)));
      }
    } else {
      family.cUnits.push(new Unit(family.id, [child]));
    }
  });

  setUnitDefShifts(family);
  return family;
};
