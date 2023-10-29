import { getUnitX } from './units';
import { hasHiddenRelatives } from './hasHiddenRelatives';
import { SIZE } from '../constants';
import { FamilyType } from '../types';
const extendNode = (family) => (unit) => unit.nodes.map((node, idx) => (Object.assign(Object.assign({}, node), { top: family.Y + (unit.child && !!family.parents.length ? SIZE : 0), left: getUnitX(family, unit) + idx * SIZE, hasSubTree: hasHiddenRelatives(family, node) })));
const getParentNodes = (family) => ([FamilyType.root, FamilyType.parent].includes(family.type) ? family.parents : []).map(extendNode(family));
const getChildNodes = (family) => ([FamilyType.root, FamilyType.child].includes(family.type) ? family.children : []).map(extendNode(family));
const mapFamily = (family) => [getParentNodes(family), getChildNodes(family)].flat(2);
export const getExtendedNodes = (families) => families.map(mapFamily).flat();
