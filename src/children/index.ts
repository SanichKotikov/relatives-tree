import Store from '../store';
import { prop } from '../utils';
import { withType } from '../utils/family';
import { hasChildren } from '../utils/units';
import { Family, FamilyType, Unit } from '../types';
import { createFamilyFunc } from './createFamilyFunc';
import { updateFamilyFunc } from './updateFamilyFunc';
import { arrangeFamiliesFunc } from './arrangeFamiliesFunc';

const getUnitsWithChildren = (family: Family): Unit[] => (
  family.children.filter(hasChildren).reverse()
);

export const inChildDirection = (store: Store): Store => {
  const createFamily = createFamilyFunc(store);
  const updateFamily = updateFamilyFunc(store);
  const arrangeFamilies = arrangeFamiliesFunc(store);

  for (const rootFamily of store.familiesArray.filter(withType(FamilyType.root))) {
    let stack: Unit[] = getUnitsWithChildren(rootFamily);

    while (stack.length) {
      const parentUnit = stack.pop()!;

      const family = createFamily(
        parentUnit.nodes.map(prop('id')),
        FamilyType.child,
      );

      updateFamily(family, parentUnit);
      arrangeFamilies(family);

      store.families.set(family.id, family);
      stack = stack.concat(getUnitsWithChildren(family));
    }
  }

  return store;
};