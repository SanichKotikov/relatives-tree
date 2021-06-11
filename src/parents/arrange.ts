import type Store from '../store';
import { SIZE } from '../constants';
import { correctUnitsShift, getUnitX, nodeCount, sameAs } from '../utils/units';
import { rightOf, unitNodesCount, widthOf } from '../utils/family';
import { nextIndex } from '../utils';
import type { Family } from '../types';

const arrangeNextFamily = (family: Family, nextFamily: Family): void => {
  const unit = family.children[0]!;
  const index = nextFamily.parents.findIndex(sameAs(unit));

  index === 0 && nextFamily.parents[index]!.pos === 0
    ? nextFamily.X = getUnitX(family, unit)
    : nextFamily.parents[index]!.pos = getUnitX(family, unit) - nextFamily.X;

  const nextIdx: number = nextIndex(index);

  if (nextFamily.parents[nextIdx]) {
    correctUnitsShift(
      nextFamily.parents.slice(nextIdx),
      rightOf(family) - getUnitX(nextFamily, nextFamily.parents[nextIdx]!),
    );
  }
};

export const arrangeFamiliesFunc = (store: Store) => (
  (family: Family): void => {
    while (family.cid) {
      const nextFamily = store.getFamily(family.cid);
      const unit = family.children[0]!;

      if (/* is middle (root) family */ !nextFamily.cid) {
        unit.pos = (widthOf(family) - nodeCount(unit) * SIZE) / 2;
      }
      else {
        if (family.parents.length === 2 && unitNodesCount(family.parents) > 2)
          unit.pos = Math.floor(family.parents[1]!.pos / 2);
        arrangeNextFamily(family, nextFamily);
      }

      family = nextFamily;
    }
  }
);
