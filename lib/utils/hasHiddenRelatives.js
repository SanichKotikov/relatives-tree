import { FamilyType } from '../types';
import { withId, withIds } from './index';
import { nodeIds } from './units';
const inUnits = (units, nodeId) => units.some((unit) => unit.nodes.some(withId(nodeId)));
export const hasHiddenRelatives = (family, node) => {
    if (family.type !== FamilyType.child && inUnits(family.parents, node.id)) {
        return ((family.type === FamilyType.parent && (node.children.length > 1 || node.spouses.length > 1)) ||
            (!node.parents.length && !!node.siblings.length));
    }
    if (family.type !== FamilyType.parent && inUnits(family.children, node.id)) {
        const parentIds = family.parents.length ? nodeIds(family.parents[0]) : [];
        return !node.parents.some(withIds(parentIds)) && (!!node.parents.length || !!node.siblings.length);
    }
    return false;
};
