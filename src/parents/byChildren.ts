import { byGender, prop } from '../utils';
import Store from '../store';
import Family from '../models/family';
import Unit from '../models/unit';

export default (store: Store) => {
  return (childIDs: ReadonlyArray<string>): Family => {
    const family = new Family(store.getNextId(), 'parent');
    const cUnit = new Unit(family.id, store.getNodes(childIDs), true);

    cUnit.nodes.forEach((child, idx) => {
      const parents = [...store.getNodes(child.parents.map(prop('id')))]
        .sort(byGender(store.root.gender));

      if (parents.length) {
        const pUnit = new Unit(family.id, parents);

        pUnit.size > 1 && cUnit.size > 1 && store.root.gender === child.gender
          ? cUnit.shift += 2
          : pUnit.shift = cUnit.shift + idx * 2;

        family.pUnits.push(pUnit);
      }
    });

    family.cUnits.push(cUnit);
    return family;
  };
}
