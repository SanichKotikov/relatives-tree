import Store from '../store';
import { getUnitX, sameAs, updateUnitPos } from '../utils/units';
import { rightOf } from '../utils/family';
import { nextIndex, withId } from '../utils';
import { arrangeParentsIn } from '../utils/arrangeParentsIn';
import { Family, Unit } from '../types';

const arrangeNextUnits = (family: Family, startIndex: number, startFrom: number): void => {
  const nextUnit: Unit | undefined = family.children[startIndex];
  if (nextUnit) updateUnitPos(family.children, startIndex, startFrom - getUnitX(family, nextUnit));
};

const arrangeNextFamily = (family: Family, nextFamily: Family): void => {
  const unit = family.parents[0];
  const index = nextFamily.children.findIndex(sameAs(unit));

  index === 0
    ? nextFamily.X = getUnitX(family, unit) - nextFamily.children[index].pos
    : nextFamily.children[index].pos = getUnitX(family, unit) - nextFamily.X;

  arrangeNextUnits(nextFamily, nextIndex(index), rightOf(family));
};

const arrangeMiddleFamilies = (families: readonly Family[], fid: number, startFrom: number): void => {
  const start = nextIndex(families.findIndex(withId(fid)));
  const family: Family | undefined = families[start];

  if (family) {
    const shift: number = startFrom - family.X;
    for (let i = start; i < families.length; i++) families[i].X += shift;
  }
};

export const arrangeFamiliesFunc = (store: Store) => (
  (family: Family): void => {
    while (family.pid) {
      const nextFamily = store.getFamily(family.pid);

      arrangeNextFamily(family, nextFamily);
      arrangeParentsIn(nextFamily);

      if (!nextFamily.pid) {
        arrangeMiddleFamilies(store.rootFamilies, nextFamily.id, rightOf(family));
      }

      family = nextFamily;
    }
  }
);
