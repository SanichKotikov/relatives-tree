import hasHiddenRelatives from './hasHiddenRelatives';
import { flat } from './index';
import Family from '../models/family';
import Unit from '../models/unit';
import { IFamilyNode, IFamilyExtNode } from '../types';

const PARENTS = ['root', 'parent'];
const CHILDREN = ['root', 'child'];

const extendNode = (family: Family) => (unit: Unit) => (
  unit.nodes.map((node: IFamilyNode, idx: number) => ({
    ...node,
    top: family.top + (unit.isChild ? 2 : 0),
    left: family.left + unit.shift + (idx * 2),
    hasSubTree: hasHiddenRelatives(family, node),
  }))
);

const getParentNodes = (family: Family) =>
  (~PARENTS.indexOf(family.type) ? family.pUnits : []).map(extendNode(family));

const getChildNodes = (family: Family) =>
  (~CHILDREN.indexOf(family.type) ? family.cUnits : []).map(extendNode(family));

const mapFamily = (family: Family) =>
  [...getParentNodes(family), ...getChildNodes(family)].reduce(flat);

export default (families: Family[]): IFamilyExtNode[] =>
  families.map(mapFamily).reduce(flat);
