import Store from '../store';
import { sameAs } from '../utils/units';
import { rightOf, withType } from '../utils/family';
import { withId } from '../utils';
import { arrangeParentUnit } from '../utils/arrangeParentUnit';
import { Family, FamilyType, Unit } from '../types';

const arrangeMiddle = (families: Family[], start: number = 1, left: number = 0): void => {
  if (families.length >= start + 1) {
    const shift = left - families[start].X;

    for (let i = start; i < families.length; i++) {
      families[i].X += shift;
    }
  }
};

export const arrangeFamiliesFunc = (store: Store) => (
  (family: Family): void => {
    if (!family.pid) return;
    let right = 0;

    while (family) {
      const fUnit = family.parents[0];

      right = Math.max(right, rightOf(family));

      const pFamily = store.getFamily(family.pid as number); // TODO

      const cUnit = pFamily.children.find(sameAs(fUnit)) as Unit; // TODO
      const uIndex = pFamily.children.findIndex(unit => (
        unit.nodes[0].id === fUnit.nodes[0].id
      ));

      if (uIndex === 0) {
        const left = family.X + fUnit.pos - cUnit.pos;
        pFamily.X = Math.max(pFamily.X, left);
      }
      else {
        cUnit.pos = family.X + fUnit.pos - pFamily.X;
      }

      const next = pFamily.children[uIndex + 1];

      if (next) {
        const diff = right - (pFamily.X + next.pos);

        for (let i = uIndex + 1; i < pFamily.children.length; i++) {
          pFamily.children[i].pos += diff;
        }
      }

      arrangeParentUnit(pFamily);

      if (!pFamily.pid) {
        const rootFamily = store.familiesArray.filter(withType(FamilyType.root));
        const start = rootFamily.findIndex(withId(pFamily.id));
        arrangeMiddle(rootFamily, start + 1, rightOf(family));
        break;
      }

      family = pFamily;
    }
  }
);
