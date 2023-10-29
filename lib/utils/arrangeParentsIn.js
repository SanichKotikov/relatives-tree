import { SIZE } from '../constants';
import { prop, withIds } from './index';
import { unitNodesCount } from './family';
const calcShifts = (units, ids) => units.reduce((acc, unit) => {
    const index = unit.nodes.findIndex(withIds(ids));
    if (index !== -1)
        acc.push(unit.pos + index * SIZE);
    return acc;
}, []);
const middle = (values) => {
    const result = (values[0] + values[values.length - 1]) / 2;
    return Number.isNaN(result) ? 0 : result;
};
export const arrangeParentsIn = (family) => {
    if (!family.parents.length || family.children.length <= 1)
        return;
    family.parents.forEach((unit) => {
        const ids = unit.nodes[0].children.map(prop('id'));
        unit.pos = Math.floor(middle(calcShifts(family.children, ids)) - (unitNodesCount(family.parents) - 1));
    });
};
