import type { Family, Node, Unit } from '../types';
export declare const newUnit: (fid: number, nodes: readonly Node[], isChild?: boolean) => Unit;
export declare const nodeIds: (unit: Unit) => readonly string[];
export declare const nodeCount: (unit: Unit) => number;
export declare const hasChildren: (unit: Unit) => boolean;
export declare const rightSide: (unit: Unit) => number;
export declare const sameAs: (target: Unit) => (unit: Unit) => boolean;
export declare const getUnitX: (family: Family, unit: Unit) => number;
export declare const unitsToNodes: (units: readonly Unit[]) => Readonly<{
    id: string;
    gender: import("../types").Gender;
    parents: readonly Readonly<{
        id: string;
        type: import("../types").RelType;
    }>[];
    children: readonly Readonly<{
        id: string;
        type: import("../types").RelType;
    }>[];
    siblings: readonly Readonly<{
        id: string;
        type: import("../types").RelType;
    }>[];
    spouses: readonly Readonly<{
        id: string;
        type: import("../types").RelType;
    }>[];
    placeholder?: boolean | undefined;
}>[];
export declare const arrangeInOrder: (units: readonly Unit[]) => void;
export declare const correctUnitsShift: (units: readonly Unit[], shift: number) => void;
