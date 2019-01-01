import byParents from './byParents';
import arrange from './arrange';
import Store from '../store';
import Unit from '../models/unit';

export default (store: Store): void => {
  const root = [...store.families.values()].filter(f => f.type === 'root');

  for (const rootFamily of root) {
    let stack = rootFamily.cUnitsWithChildren.reverse();

    while (stack.length) {
      const familyUnit = stack.pop() as Unit; // TODO

      const family = byParents(store, familyUnit.nodes.map(node => node.id), 'child');
      const parentFamily = store.getFamily(familyUnit.familyId);

      family.pID = parentFamily.id;
      family.top = parentFamily.top + 2;
      family.left = parentFamily.left + familyUnit.shift;

      arrange(store, family);
      store.families.set(family.id, family);

      const nextUnits = family.cUnitsWithChildren;
      if (nextUnits.length) stack = [...stack, ...nextUnits.reverse()];
    }
  }

};
