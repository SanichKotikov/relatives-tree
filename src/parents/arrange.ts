import Store from '../store';
import { SIZE } from '../constants';
import { getUnitX, nodeCount, sameAs } from '../utils/units';
import { rightOf, unitCount, widthOf } from '../utils/family';
import { nextIndex } from '../utils';
import { Family, Unit } from '../types';

const arrangeNextFamily = (family: Family, nextFamily: Family, unit: Unit) => {
  const index = nextFamily.parents.findIndex(sameAs(unit));

  index === 0 && nextFamily.parents[index].pos === 0
    ? nextFamily.X = getUnitX(family, unit)
    : nextFamily.parents[index].pos = getUnitX(family, unit) - nextFamily.X;

  const nextIdx: number = nextIndex(index);

  if (nextFamily.parents[nextIdx]) {
    const shift = rightOf(family) - getUnitX(nextFamily, nextFamily.parents[nextIdx]);
    nextFamily.parents.slice(nextIdx).forEach(unit => unit.pos += shift);
  }
};

export const arrangeFamiliesFunc = (store: Store) => (
  (family: Family): void => {
    while (family.cid) {
      const unit = family.children[0];
      const nextFamily = store.getFamily(family.cid);

      if (/* is middle (root) family */ !nextFamily.cid)
        unit.pos = (widthOf(family) - nodeCount(unit) * SIZE) / 2;
      else {
        if (family.parents.length === 2 && unitCount(family.parents) > 2)
          unit.pos = Math.floor(family.parents[1].pos / 2);

        arrangeNextFamily(family, nextFamily, unit);
      }

      family = nextFamily;
    }
  }
);
