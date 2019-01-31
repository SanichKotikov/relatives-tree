import Store from '../store';
import Family from '../models/family';
import { prop, withType, min } from './index';

export default (store: Store): Store => {
  const families = store.familiesArray;

  const vShift = min(families.map(prop('top'))) * -1;
  if (vShift !== 0) families.forEach(family => family.top += vShift);

  const rootChild = families.find(f => f.main) as Family; // TODO
  const rootParent = families.find(f => f.cID === rootChild.id);

  if (rootParent) {
    const cUnit = rootChild.pUnits[0];
    const pUnit = rootParent.cUnits[0];

    const diff = (rootParent.left + pUnit.shift) - (rootChild.left + cUnit.shift);

    if (diff > 0) families
      .filter(withType('child', 'root'))
      .forEach(family => family.left += diff);
    else if (diff < 0) families
      .filter(withType('parent'))
      .forEach(family => family.left += diff * -1);

    const hShift = min(families.map(prop('left')));
    if (hShift > 0) families.forEach(family => family.left -= hShift);
  }

  return store;
};
