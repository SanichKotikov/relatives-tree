import Unit from '../models/unit';
import { SIZE } from '../constants';
import { prop, withType } from '../utils';
import Store from '../store';
import byParents from './byParents';
import arrange from './arrange';

export default (store: Store): Store => {
  const createFamily = byParents(store);
  const arrangeFamily = arrange(store);
  const root = store.familiesArray.filter(withType('root'));

  for (const rootFamily of root) {
    let stack = rootFamily.cUnitsWithChildren.reverse();

    while (stack.length) {
      const familyUnit = stack.pop() as Unit; // TODO

      const family = createFamily(familyUnit.nodes.map(prop('id')), 'child');
      const parentFamily = store.getFamily(familyUnit.familyId);

      family.pID = parentFamily.id;
      family.top = parentFamily.top + parentFamily.height - SIZE;
      family.left = parentFamily.left + familyUnit.shift;

      arrangeFamily(family);
      store.families.set(family.id, family);

      const nextUnits = family.cUnitsWithChildren;
      if (nextUnits.length) stack = [...stack, ...nextUnits.reverse()];
    }
  }

  return store;
};
