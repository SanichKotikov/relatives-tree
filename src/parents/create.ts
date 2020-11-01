import byChildren from './byChildren';
import arrange from './arrange';
import { prop } from '../utils';
import { pUnitsWithParents, withType } from '../utils/family';
import Store from '../store';
import { FamilyType, Unit } from '../types';

export default (store: Store): Store => {
  const createFamily = byChildren(store);
  const arrangeFamily = arrange(store);
  const root = store.familiesArray.filter(withType(FamilyType.root));

  for (const rootFamily of root) {
    if (!rootFamily.main) continue;
    let stack = pUnitsWithParents(rootFamily).reverse();

    while (stack.length) {
      const familyUnit: Unit = stack.pop() as Unit;

      const family = createFamily(familyUnit.nodes.map(prop('id')));
      const childFamily = store.getFamily(familyUnit.fid);

      family.cid = childFamily.id;
      family.Y = childFamily.Y - 2;
      family.X = childFamily.X + familyUnit.pos;

      arrangeFamily(family);
      store.families.set(family.id, family);

      const nextUnits = pUnitsWithParents(family);
      if (nextUnits.length) stack = [...stack, ...nextUnits.reverse()];
    }
  }

  return store;
};
