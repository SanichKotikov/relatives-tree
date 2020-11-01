import hasHiddenRelatives from './hasHiddenRelatives';
import { flat } from './index';
import { Family, FamilyType, IFamilyExtNode, IFamilyNode, Unit } from '../types';

function extendNode(family: Family) {
  return (unit: Unit) => (
    unit.nodes.map((node: IFamilyNode, idx: number) => ({
      ...node,
      top: family.Y + (unit.child && !!family.parents.length ? 2 : 0),
      left: family.X + unit.pos + (idx * 2),
      hasSubTree: hasHiddenRelatives(family, node),
    }))
  );
}

function getParentNodes(family: Family) {
  return (
    [FamilyType.root, FamilyType.parent].includes(family.type) ? family.parents : []
  ).map(extendNode(family));
}

function getChildNodes(family: Family) {
  return (
    [FamilyType.root, FamilyType.child].includes(family.type) ? family.children : []
  ).map(extendNode(family));
}

function mapFamily(family: Family) {
  return [...getParentNodes(family), ...getChildNodes(family)].reduce(flat, []);
}

export default (families: ReadonlyArray<Family>): ReadonlyArray<IFamilyExtNode> => {
  return families.map(mapFamily).reduce(flat);
}
