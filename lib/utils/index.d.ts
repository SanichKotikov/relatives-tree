import type Store from '../store';
import type { Gender, Node, Relation } from '../types';
export declare const nextIndex: (index: number) => number;
export declare const prop: <T, K extends keyof T>(name: K) => (item: T) => T[K];
export declare const withId: <T extends {
    id: any;
}, K extends keyof T>(id: T[K]) => (item: T) => boolean;
export declare const withIds: <T extends {
    id: any;
}, K extends keyof T>(ids: readonly T[K][], include?: boolean) => (item: T) => boolean;
export declare const unique: <T>(item: T, index: number, arr: T[]) => boolean;
export declare const inAscOrder: (v1: number, v2: number) => number;
export declare const pipe: (...fus: Function[]) => <T>(init: T) => T;
export declare const min: (arr: number[]) => number;
export declare const max: (arr: number[]) => number;
export declare const toMap: <T extends {
    id: any;
}>(items: readonly T[]) => Map<T["id"], T>;
export declare const hasDiffParents: (node: Node) => boolean;
export declare const byGender: (target: Gender) => (_: Node, b: Node) => 1 | -1;
export declare const relToNode: (store: Store) => (rel: Relation) => Readonly<{
    id: string;
    gender: Gender;
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
}>;
export declare const withRelType: (...types: readonly Relation['type'][]) => (item: Relation) => boolean;
