import Store from '../store';
import arrangeMiddle from '../middle/arrange';
import { sameAs } from '../utils/units';
import { fRight } from '../utils/family';
import { withId, withType } from '../utils';
import { arrangeParentUnit } from '../utils/arrangeParentUnit';
import { Family, Unit } from '../types';

export default (store: Store) => {
  return function(family: Family): void {
    if (!family.pid) return;
    let right = 0;

    while (family) {
      const fUnit = family.parents[0];

      right = Math.max(right, fRight(family));

      const pFamily = store.getFamily(family.pid as number); // TODO

      const cUnit = pFamily.children.find(sameAs(fUnit)) as Unit; // TODO
      const uIndex = pFamily.children.findIndex(unit => (
        unit.nodes[0].id === fUnit.nodes[0].id
      ));

      if (uIndex === 0) {
        const left = family.left + fUnit.pos - cUnit.pos;
        pFamily.left = Math.max(pFamily.left, left);
      }
      else {
        cUnit.pos = family.left + fUnit.pos - pFamily.left;
      }

      const next = pFamily.children[uIndex + 1];

      if (next) {
        const diff = right - (pFamily.left + next.pos);

        for (let i = uIndex + 1; i < pFamily.children.length; i++) {
          pFamily.children[i].pos += diff;
        }
      }

      arrangeParentUnit(pFamily);

      if (!pFamily.pid) {
        const rootFamily = store.familiesArray.filter(withType('root'));
        const start = rootFamily.findIndex(withId(pFamily.id));
        arrangeMiddle(rootFamily, start + 1, fRight(family));
        break;
      }

      family = pFamily;
    }
  };
};
