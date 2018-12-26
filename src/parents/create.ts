import byChildren from './byChildren';
import arrange from './arrange';
import Store from '../store';
import Unit from '../models/unit';

export default (store: Store): void => {
  const root = [...store.families.values()].filter(f => f.type === 'root');

  for (const rootFamily of root) {
    if (!rootFamily.main) continue;
    let stack = rootFamily.pUnitsWithParents.reverse();

    while (stack.length) {
      const familyUnit: Unit = stack.pop() as Unit;

      const family = byChildren(store, familyUnit.nodes.map(node => node.id));
      const childFamily = store.getFamily(familyUnit.familyId);

      family.cID = childFamily.id;
      family.top = childFamily.top - 1;
      family.left = childFamily.left + familyUnit.shift;

      arrange(store, family);
      store.families.set(family.id, family);

      const nextUnits = family.pUnitsWithParents;
      if (nextUnits.length) stack = [...stack, ...nextUnits.reverse()];
    }
  }

};