import { prop, withId } from '../utils';
import { unitsToNodes } from '../utils/units';
import { setDefaultUnitShift } from '../utils/setDefaultUnitShift';
import { Family, Node, Unit } from '../types';

const includes = (ids: readonly string[], include = true) => (
  (node: Node) => ids.includes(node.id) === include
);

const moveSharedUnitToRight = (sharedIDs: readonly string[]) => (
  (a: Unit, b: Unit) => {
    const foundA = a.nodes.some(includes(sharedIDs));
    const foundB = b.nodes.some(includes(sharedIDs));

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
  bloodFamily.children.forEach((unit, idx) => unit.pos = cachePos[idx]);

  adoptedFamily.children = adoptedFamily.children
    .filter(unit => unit.nodes.some(includes(sharedIDs, false)));

  setDefaultUnitShift(adoptedFamily);
};
