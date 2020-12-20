import { flat } from './index';
import { getUnitX } from './units';
import { hasHiddenRelatives } from './hasHiddenRelatives';
import { ExtNode, Family, FamilyType, Node, Unit } from '../types';

const extendNode = (family: Family) => (
  (unit: Unit) => (
    unit.nodes.map((node: Node, idx: number) => ({
      ...node,
      top: family.Y + (unit.child && !!family.parents.length ? 2 : 0),
      left: getUnitX(family, unit) + (idx * 2),
      hasSubTree: hasHiddenRelatives(family, node),
    }))
  )
);

const getParentNodes = (family: Family) => (
  [FamilyType.root, FamilyType.parent].includes(family.type) ? family.parents : []
).map(extendNode(family));

const getChildNodes = (family: Family) => (
  [FamilyType.root, FamilyType.child].includes(family.type) ? family.children : []
).map(extendNode(family));

const mapFamily = (family: Family) => [...getParentNodes(family), ...getChildNodes(family)].reduce(flat, []);

export const getExtendedNodes = (families: readonly Family[]): readonly ExtNode[] => (
  families.map(mapFamily).reduce(flat)
);
