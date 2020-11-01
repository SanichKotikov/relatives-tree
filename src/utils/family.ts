import { SIZE } from '../constants';
import { Family, FamilyType, Unit } from '../types';
import { max } from './index';
import { nodeCount, rightSide } from './units';

export const newFamily = (id: number, type: FamilyType, main = false): Family => ({
  id,
  type,
  main,
  Y: 0,
  X: 0,
  parents: [],
  children: [],
});

export const withType = <T extends { type: FamilyType; }>(...types: readonly FamilyType[]) => (
  (item: T) => types.includes(item.type)
);

export const widthOf = (family: Family): number => max([...family.parents, ...family.children].map(rightSide));
export const heightOf = (family: Family): number => [
  family.parents.length,
  family.children.length,
].filter(Boolean).length * SIZE;
export const fRight = (family: Family): number => family.X + widthOf(family);
export const countUnits = (units: readonly Unit[]): number => units.reduce((a, b) => a + nodeCount(b), 0);

export const pUnitsWithParents = (family: Family) => (
  family.parents.filter(unit => (
    !!unit.nodes.find(node => !!node.parents.length)
  ))
);

export const cUnitsWithChildren = (family: Family) => (
  family.children.filter(unit => (
    !!unit.nodes.find(node => !!node.children.length)
  ))
);
