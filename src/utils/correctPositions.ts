import Store from '../store';
import { FamilyType } from '../types';
import { min, prop } from './index';
import { withType } from './family';
import { getUnitX } from './units';

export const correctPositions = (store: Store): Store => {
  const families = store.familiesArray;

  const vShift = min(families.map(prop('Y'))) * -1;
  if (vShift !== 0) families.forEach(family => family.Y += vShift);

  const rootChild = store.rootFamily;
  const rootParent = families.find(f => f.cid === rootChild.id);

  if (rootParent) {
    const cUnit = rootChild.parents[0];
    const pUnit = rootParent.children[0];

    const diff = getUnitX(rootParent, pUnit) - getUnitX(rootChild, cUnit);

    if (diff > 0) families
      .filter(withType(FamilyType.child, FamilyType.root))
      .forEach(family => family.X += diff);
    else if (diff < 0) families
      .filter(withType(FamilyType.parent))
      .forEach(family => family.X += diff * -1);

    const hShift = min(families.map(prop('X')));
    if (hShift > 0) families.forEach(family => family.X -= hShift);
  }

  const totalShift = min(families.map(f => f.X)) * -1;
  if (totalShift !== 0) families.forEach(family => family.X += totalShift);

  return store;
};
