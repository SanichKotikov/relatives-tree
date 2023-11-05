import { prop, withIds } from '../utils';
import { getUnitX, nodeCount } from '../utils/units';
import { getParentsX, withType } from '../utils/family';
import { HALF_SIZE, NODES_IN_COUPLE, SIZE } from '../constants';
import { FamilyType } from '../types';
const getChildIDs = (unit) => unit.nodes.map(prop('children')).flat().map(prop('id'));
const calcConnectors = (family) => (connectors, unit) => {
    const pX = getParentsX(family, unit);
    const pY = family.Y + HALF_SIZE;
    const mY = family.Y + SIZE;
    if (nodeCount(unit) === NODES_IN_COUPLE)
        connectors.push([pX - HALF_SIZE, pY, pX + HALF_SIZE, pY]);
    connectors.push([pX, pY, pX, mY]);
    const child = family.children[0];
    const cX = getUnitX(family, child) + child.nodes.findIndex(withIds(getChildIDs(unit))) * SIZE + HALF_SIZE;
    connectors.push([cX, mY, cX, mY + HALF_SIZE]);
    return connectors;
};
export const parents = (families) => families
    .filter(withType(FamilyType.parent))
    .reduce((connectors, family) => connectors.concat(family.parents.reduce(calcConnectors(family), [])), []);
