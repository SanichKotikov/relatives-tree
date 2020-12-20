import Store from '../store';
import { prop } from '../utils';
import { getUnitX } from '../utils/units';
import { Family, Unit } from '../types';
import { byChildren } from './byChildren';
import { arrange } from './arrange';

const getParentUnitsWithParents = (family: Family): Unit[] => (
  family.parents.filter(unit => (
    !!unit.nodes.find(node => !!node.parents.length)
  ))
);

export const parents = (store: Store): Store => {
  const createFamily = byChildren(store);
  const arrangeFamily = arrange(store);

  for (const rootFamily of store.rootFamilies) {
    if (!rootFamily.main) continue;
    let stack = getParentUnitsWithParents(rootFamily).reverse();

    while (stack.length) {
      const familyUnit: Unit = stack.pop() as Unit;

      const family = createFamily(familyUnit.nodes.map(prop('id')));
      const childFamily = store.getFamily(familyUnit.fid);

      family.cid = childFamily.id;
      family.Y = childFamily.Y - 2;
      family.X = getUnitX(childFamily, familyUnit);

      arrangeFamily(family);
      store.families.set(family.id, family);

      const nextUnits = getParentUnitsWithParents(family);
      if (nextUnits.length) stack = [...stack, ...nextUnits.reverse()];
    }
  }

  return store;
};
