import { SIZE } from '../constants';
import { max } from './index';
import { getUnitX, nodeCount, rightSide } from './units';
export const newFamily = (id, type, main = false) => ({
    id,
    type,
    main,
    Y: 0,
    X: 0,
    parents: [],
    children: [],
});
export const withType = (...types) => (item) => types.includes(item.type);
export const widthOf = (family) => max([...family.parents, ...family.children].map(rightSide));
export const heightOf = (family) => [family.parents.length, family.children.length].filter(Boolean).length * SIZE;
export const rightOf = (family) => family.X + widthOf(family);
export const bottomOf = (family) => family.Y + heightOf(family);
export const unitNodesCount = (units) => units.reduce((acc, b) => acc + nodeCount(b), 0);
export const getParentsX = (family, unit) => {
    return unit ? getUnitX(family, unit) + nodeCount(unit) : 0;
};
