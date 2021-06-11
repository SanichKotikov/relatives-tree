import type Store from '../store';
import { Family, FamilyType } from '../types';
import { min, prop } from './index';
import { withType } from './family';
import { getUnitX } from './units';

const alignGenerations = (families: readonly Family[], root: Family): void => {
  const parents = families.find(family => family.cid === root.id);

  if (parents) {
    const shift = (
      getUnitX(parents, parents.children[0]!) -
      getUnitX(root, root.parents[0]!)
    );

    families
      .filter(withType(FamilyType.child, FamilyType.root))
      .forEach(family => family.X += shift);
  }
};

const correct = (families: readonly Family[], coordinate: 'X' | 'Y'): void => {
  const shift = min(families.map(prop(coordinate))) * -1;
  if (shift !== 0) families.forEach(family => family[coordinate] += shift);
};

export const correctPositions = (store: Store): Store => {
  const families = store.familiesArray;

  alignGenerations(families, store.rootFamily);
  correct(families, 'Y');
  correct(families, 'X');

  return store;
};
