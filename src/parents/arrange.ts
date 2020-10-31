import Store from '../store';
import { nodeCount, sameAs } from '../utils/units';
import { countUnits, fRight, widthOf } from '../utils/family';
import { Family, Unit } from '../types';

export default (store: Store) => {
  return function(family: Family): void {
    if (!family.cid) return;
    let right = 0;

    while (family) {
      const fUnit = family.children[0];

      if (family.parents.length === 2 && countUnits(family.parents) > 2) {
        fUnit.pos = Math.floor(family.parents[1].pos / 2);
      }

      const shift = fUnit.pos;
      right = Math.max(right, fRight(family));

      const cFamily = store.getFamily(family.cid as number); // TODO

      // root family
      if (!cFamily.cid) {
        fUnit.pos = (widthOf(family) - nodeCount(fUnit) * 2) / 2;
        break;
      }

      const pUnit = cFamily.parents.find(sameAs(fUnit)) as Unit; // TODO
      const uIndex = cFamily.parents.findIndex(unit => (
        unit.nodes[0].id === fUnit.nodes[0].id
      ));

      if (uIndex === 0 && pUnit.pos === 0) {
        const left = family.X + shift;
        cFamily.X = Math.max(cFamily.X, left);
      }
      else {
        pUnit.pos = family.X + fUnit.pos - cFamily.X;
      }

      const next = cFamily.parents[uIndex + 1];

      if (next) {
        const diff = right - (cFamily.X + next.pos);

        if (diff > 0) {
          for (let i = uIndex + 1; i < cFamily.parents.length; i++) {
            cFamily.parents[i].pos += diff;
          }
        }
      }

      family = cFamily;
    }
  };
};
