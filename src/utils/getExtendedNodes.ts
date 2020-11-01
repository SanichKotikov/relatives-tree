import { flat } from './index';
import { hasHiddenRelatives } from './hasHiddenRelatives';
import { Family, FamilyType, IFamilyExtNode, IFamilyNode, Unit } from '../types';

const extendNode = (family: Family) => (
  (unit: Unit) => (
    unit.nodes.map((node: IFamilyNode, idx: number) => ({
      ...node,
      top: family.Y + (unit.child && !!family.parents.length ? 2 : 0),
      left: family.X + unit.pos + (idx * 2),
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

export const getExtendedNodes = (families: ReadonlyArray<Family>): ReadonlyArray<IFamilyExtNode> => (
  families.map(mapFamily).reduce(flat)
);
