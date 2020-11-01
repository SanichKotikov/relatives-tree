import { SIZE } from '../constants';
import { prop } from '../utils';
import { cUnitsWithChildren, heightOf, withType } from '../utils/family';
import Store from '../store';
import byParents from './byParents';
import arrange from './arrange';
import { FamilyType, Unit } from '../types';

export default (store: Store): Store => {
  const createFamily = byParents(store);
  const arrangeFamily = arrange(store);
  const root = store.familiesArray.filter(withType(FamilyType.root));

  for (const rootFamily of root) {
    let stack = cUnitsWithChildren(rootFamily).reverse();

    while (stack.length) {
      const familyUnit = stack.pop() as Unit; // TODO

      const family = createFamily(familyUnit.nodes.map(prop('id')), FamilyType.child);
      const parentFamily = store.getFamily(familyUnit.fid);

      family.pid = parentFamily.id;
      family.Y = parentFamily.Y + heightOf(parentFamily) - SIZE;
      family.X = parentFamily.X + familyUnit.pos;

      arrangeFamily(family);
      store.families.set(family.id, family);

      const nextUnits = cUnitsWithChildren(family);
      if (nextUnits.length) stack = [...stack, ...nextUnits.reverse()];
    }
  }

  return store;
};
