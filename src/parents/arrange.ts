import Store from '../store';
import { getUnitX, nodeCount, sameAs, updateUnitPos } from '../utils/units';
import { rightOf, unitCount, widthOf } from '../utils/family';
import { nextIndex } from '../utils';
import { Family, Unit } from '../types';

export const arrange = (store: Store) => (
  (family: Family): void => {
    if (!family.cid) return;
    let right = 0;

    while (family) {
      const fUnit = family.children[0];

      if (family.parents.length === 2 && unitCount(family.parents) > 2) {
        fUnit.pos = Math.floor(family.parents[1].pos / 2);
      }

      const shift = fUnit.pos;
      right = Math.max(right, rightOf(family));

      const cFamily = store.getFamily(family.cid as number); // TODO

      // root family
      if (!cFamily.cid) {
        fUnit.pos = (widthOf(family) - nodeCount(fUnit) * 2) / 2;
        break;
      }

      const pUnit = cFamily.parents.find(sameAs(fUnit)) as Unit; // TODO
      const uIndex = cFamily.parents.findIndex(sameAs(fUnit));

      if (uIndex === 0 && pUnit.pos === 0) {
        const left = family.X + shift;
        cFamily.X = Math.max(cFamily.X, left);
      }
      else {
        pUnit.pos = getUnitX(family, fUnit) - cFamily.X;
      }

      const next = cFamily.parents[nextIndex(uIndex)];

      if (next) {
        const diff = right - getUnitX(cFamily, next);
        updateUnitPos(cFamily.parents, nextIndex(uIndex), diff);
      }

      family = cFamily;
    }
  }
);
