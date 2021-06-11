import { prop, withId, withIds } from '../utils';
import { unitsToNodes } from '../utils/units';
import { setDefaultUnitShift } from '../utils/setDefaultUnitShift';
import type { Family, Node, Unit } from '../types';

const moveSharedUnitToRight = (sharedIDs: readonly string[]) => (
  (a: Unit, b: Unit) => {
    const foundA = a.nodes.some(withIds(sharedIDs));
    const foundB = b.nodes.some(withIds(sharedIDs));

    if (foundA && !foundB) return 1;
    if (!foundA && foundB) return -1;

    return 0;
  }
);

const sameIn = (units: readonly Unit[]) => {
  const target = unitsToNodes(units);
  return (node: Node) => target.some(withId(node.id));
};

export const correctOverlaps = (bloodFamily: Family, adoptedFamily: Family): void => {
  const sharedIDs = unitsToNodes(bloodFamily.children)
    .filter(sameIn(adoptedFamily.children))
    .map(prop('id'));

  const cachePos: readonly number[] = bloodFamily.children.map(prop('pos'));
  bloodFamily.children = [...bloodFamily.children].sort(moveSharedUnitToRight(sharedIDs));
  bloodFamily.children.forEach((unit, idx) => unit.pos = cachePos[idx]!);

  adoptedFamily.children = adoptedFamily.children
    .filter(unit => unit.nodes.some(withIds(sharedIDs, false)));

  setDefaultUnitShift(adoptedFamily);
};
