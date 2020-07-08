import Store from '../store';
import Family from '../models/family';
import Unit from '../models/unit';
import { relToNode, withId } from '../utils';
import setUnitDefShifts from '../utils/setUnitDefShifts';
import getChildUnits from './getChildUnits';
import { FamilyType, IFamilyNode } from '../types';

export default (store: Store) => {
  return function(parentIDs: string[], type: FamilyType = 'root', isMain: boolean = false): Family {
    const family = new Family(store.getNextId(), type, isMain);

    const parents = parentIDs.map(store.getNode.bind(store));
    if (family.main) parents.sort((a, b) => (b.gender !== store.gender) ? -1 : 0);

    family.pUnits.push(new Unit(family.id, parents));

    // CHILDREN
    let children: IFamilyNode[] = [];

    if (parents.length === 1) {
      children = parents[0].children.map(relToNode(store));
    }
    else {
      const firstParent = parents[0];
      const secondParent = parents[1];

      children = firstParent.children
        .filter(rel => secondParent.children.find(withId(rel.id)))
        .map(relToNode(store));
    }

    // CHILDREN's SPOUSES
    children.forEach(child => {
      getChildUnits(store, family.id, child).forEach(unit => {
        family.cUnits.push(unit);
      });
    });

    setUnitDefShifts(family);
    return family;
  };
};
