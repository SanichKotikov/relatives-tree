import hasHiddenRelatives from './hasHiddenRelatives';
import { flat } from './index';
import Family from '../models/family';
import Unit from '../models/unit';
import { IFamilyExtNode, IFamilyNode } from '../types';

const PARENTS = ['root', 'parent'];
const CHILDREN = ['root', 'child'];

function extendNode(family: Family) {
  return (unit: Unit) => (
    unit.nodes.map((node: IFamilyNode, idx: number) => ({
      ...node,
      top: family.top + (unit.isChild && !!family.pUnits.length ? 2 : 0),
      left: family.left + unit.shift + (idx * 2),
      hasSubTree: hasHiddenRelatives(family, node),
    }))
  );
}

function getParentNodes(family: Family) {
  return (PARENTS.includes(family.type) ? family.pUnits : []).map(extendNode(family));
}

function getChildNodes(family: Family) {
  return (CHILDREN.includes(family.type) ? family.cUnits : []).map(extendNode(family));
}

function mapFamily(family: Family) {
  return [...getParentNodes(family), ...getChildNodes(family)].reduce(flat, []);
}

export default (families: ReadonlyArray<Family>): ReadonlyArray<IFamilyExtNode> => {
  return families.map(mapFamily).reduce(flat);
}
