import { prop, withId, withIds } from '../utils';
import { unitsToNodes } from '../utils/units';
import { setDefaultUnitShift } from '../utils/setDefaultUnitShift';
const moveSharedUnitToRight = (sharedIDs) => (a, b) => {
    const foundA = a.nodes.some(withIds(sharedIDs));
    const foundB = b.nodes.some(withIds(sharedIDs));
    if (foundA && !foundB)
        return 1;
    if (!foundA && foundB)
        return -1;
    return 0;
};
const sameIn = (units) => {
    const target = unitsToNodes(units);
    return (node) => target.some(withId(node.id));
};
export const correctOverlaps = (bloodFamily, adoptedFamily) => {
    const sharedIDs = unitsToNodes(bloodFamily.children).filter(sameIn(adoptedFamily.children)).map(prop('id'));
    const cachePos = bloodFamily.children.map(prop('pos'));
    bloodFamily.children = [...bloodFamily.children].sort(moveSharedUnitToRight(sharedIDs));
    bloodFamily.children.forEach((unit, idx) => (unit.pos = cachePos[idx]));
    adoptedFamily.children = adoptedFamily.children.filter((unit) => unit.nodes.some(withIds(sharedIDs, false)));
    setDefaultUnitShift(adoptedFamily);
};
