import Store from '../store';
import { byGender, prop } from '../utils';
import { newUnit, nodeCount } from '../utils/units';
import { newFamily } from '../utils/family';
import { Family, FamilyType } from '../types';

export const byChildren = (store: Store) => {
  return (childIDs: readonly string[]): Family => {
    const family = newFamily(store.getNextId(), FamilyType.parent);
    const cUnit = newUnit(family.id, store.getNodes(childIDs), true);

    cUnit.nodes.forEach((child, idx) => {
      const parents = [...store.getNodes(child.parents.map(prop('id')))]
        .sort(byGender(store.root.gender));

      if (parents.length) {
        const pUnit = newUnit(family.id, parents);

        nodeCount(pUnit) > 1 && nodeCount(cUnit) > 1 && store.root.gender === child.gender
          ? cUnit.pos += 2
          : pUnit.pos = cUnit.pos + idx * 2;

        family.parents = family.parents.concat(pUnit);
      }
    });

    family.children = family.children.concat(cUnit);
    return family;
  };
};
