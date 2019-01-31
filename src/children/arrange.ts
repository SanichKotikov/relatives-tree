import Store from '../store';
import Family from '../models/family';
import Unit from '../models/unit';
import arrangeMiddle from '../middle/arrange';
import { withId, withType, withSameIDs } from '../utils';

export default (store: Store) => {
  return function (family: Family): void {
    if (family.pID === null) return;
    let right = 0;

    while (family) {
      const fUnit = family.pUnits[0];

      const shift = fUnit.shift;
      right = Math.max(right, family.right);

      const pFamily = store.getFamily(family.pID as number); // TODO

      const cUnit = pFamily.cUnits.find(withSameIDs(fUnit)) as Unit; // TODO
      const uIndex = pFamily.cUnits.findIndex(unit => (
        unit.nodes[0].id === fUnit.nodes[0].id
      ));

      if (uIndex === 0) {
        const left = family.left + shift - cUnit.shift;
        pFamily.left = Math.max(pFamily.left, left);
      } else {
        cUnit.shift = family.left + fUnit.shift - pFamily.left;
      }

      const next = pFamily.cUnits[uIndex + 1];

      if (next) {
        const diff = right - (pFamily.left + next.shift);

        for (let i = uIndex + 1; i < pFamily.cUnits.length; i++) {
          pFamily.cUnits[i].shift += diff;
        }
      }

      const ppUnit = pFamily.pUnits[0];

      if (ppUnit) {
        const size = pFamily.width;
        ppUnit.shift = Math.floor((size - (2 * ppUnit.size)) / 2);
      }

      if (pFamily.pID === null) {
        const rootFamily = store.familiesArray.filter(withType('root'));
        const start = rootFamily.findIndex(withId(pFamily.id));
        arrangeMiddle(rootFamily, start + 1, family.right);
        break;
      }

      family = pFamily;
    }
  }
};
