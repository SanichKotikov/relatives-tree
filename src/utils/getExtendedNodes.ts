import { getUnitX } from './units';
import { hasHiddenRelatives } from './hasHiddenRelatives';
import { SIZE } from '../constants';
import { ExtNode, Family, FamilyType, Node, Unit } from '../types';

const extendNode = (family: Family) => (
  (unit: Unit) => (
    unit.nodes.map((node: Node, idx: number) => ({
      ...node,
      top: family.Y + (unit.child && !!family.parents.length ? SIZE : 0),
      left: getUnitX(family, unit) + (idx * SIZE),
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

const mapFamily = (family: Family) => [getParentNodes(family), getChildNodes(family)].flat(2);
export const getExtendedNodes = (families: readonly Family[]): readonly ExtNode[] => families.map(mapFamily).flat();
