import { Family, FamilyType, Node, Unit } from '../types';
import { withId } from './index';
import { nodeIds } from './units';

const inUnits = (units: readonly Unit[], nodeId: string) => (
  !!units.find(unit => !!unit.nodes.find(withId(nodeId)))
);

export const hasHiddenRelatives = (family: Family, node: Node): boolean => {
  if (family.type !== FamilyType.child && inUnits(family.parents, node.id)) {
    return (
      (family.type === FamilyType.parent && (node.children.length > 1 || node.spouses.length > 1)) ||
      (!node.parents.length && !!node.siblings.length)
    );
  }

  if (family.type !== FamilyType.parent && inUnits(family.children, node.id)) {
    const parentIds = family.parents.length ? nodeIds(family.parents[0]) : [];
    // TODO
    const sameParents = !!node.parents.filter(rel => parentIds.includes(rel.id)).length;
    return (!sameParents && (!!node.parents.length || !!node.siblings.length));
  }

  return false;
};
