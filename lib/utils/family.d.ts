import type { Family, FamilyType, Unit } from '../types';
export declare const newFamily: (id: number, type: FamilyType, main?: boolean) => Family;
export declare const withType: (...types: readonly Family['type'][]) => (item: Family) => boolean;
export declare const widthOf: (family: Family) => number;
export declare const heightOf: (family: Family) => number;
export declare const rightOf: (family: Family) => number;
export declare const bottomOf: (family: Family) => number;
export declare const unitNodesCount: (units: readonly Unit[]) => number;
export declare const getParentsX: (family: Family, unit: Unit | undefined) => number;
