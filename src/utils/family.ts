import { SIZE } from '../constants';
import { Family, FamilyType, Unit } from '../types';
import { max } from './index';
import { nodeCount, rightSide } from './units';

const MAX_ROWS_COUNT = 2;

export const newFamily = (id: number, type: FamilyType, main = false): Family => ({
  id,
  type,
  main,
  top: 0,
  left: 0,
  pUnits: [],
  cUnits: [],
});

export const widthOf = (family: Family): number => max([...family.pUnits, ...family.cUnits].map(rightSide));
export const heightOf = (family: Family): number => family.pUnits.length ? SIZE * MAX_ROWS_COUNT : SIZE; // TODO
export const fRight = (family: Family): number => family.left + widthOf(family);
export const countUnits = (units: readonly Unit[]): number => units.reduce((a, b) => a + nodeCount(b), 0);

export const pUnitsWithParents = (family: Family) => (
  family.pUnits.filter(unit => (
    !!unit.nodes.find(node => !!node.parents.length)
  ))
);

export const cUnitsWithChildren = (family: Family) => (
  family.cUnits.filter(unit => (
    !!unit.nodes.find(node => !!node.children.length)
  ))
);
