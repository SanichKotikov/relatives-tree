import { inAscOrder, withId } from '../utils';
import { getUnitX, nodeCount } from '../utils/units';
import { withType } from '../utils/family';
import { HALF_SIZE, NODES_IN_COUPLE, SIZE } from '../constants';
import { FamilyType } from '../types';
const calcConnectors = (family, families) => (connectors, unit) => {
    const pX = getUnitX(family, unit) + HALF_SIZE;
    const pY = family.Y + HALF_SIZE;
    if (nodeCount(unit) === NODES_IN_COUPLE) {
        console.log('### middle 1', [pX, pY, pX + SIZE, pY]);
        connectors.push([pX, pY, pX + SIZE, pY]);
    }
    else if (nodeCount(unit) === 1 && unit.nodes[0].spouses.length) {
        families
            .filter((item) => item.id !== family.id)
            .forEach((other) => {
            other.parents.forEach((parent) => {
                if (parent.nodes.some(withId(unit.nodes[0].spouses[0].id))) {
                    const xX = [pX, getUnitX(other, parent) + HALF_SIZE].sort(inAscOrder);
                    console.log('### middle 2', [xX[0], pY, xX[1], pY]);
                    connectors.push([xX[0], pY, xX[1], pY]);
                }
            });
        });
    }
    return connectors;
};
export const middle = (families) => {
    const rootFamilies = families.filter(withType(FamilyType.root));
    return rootFamilies.reduce((connectors, family) => connectors.concat(family.parents.reduce(calcConnectors(family, rootFamilies), [])), []);
};
