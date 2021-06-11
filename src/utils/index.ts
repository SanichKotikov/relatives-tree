import type Store from '../store';
import type { Gender, Node, Relation } from '../types';

export const nextIndex = (index: number) => index + 1;
export const prop = <T, K extends keyof T>(name: K) => (item: T): T[K] => item[name];
export const withId = <T extends { id: any; }, K extends keyof T>(id: T[K]) => (item: T) => item.id === id;

export const withIds = <T extends { id: any; }, K extends keyof T>(ids: readonly (T[K])[], include = true) => (
  (item: T) => ids.includes(item.id) === include
);

export const unique = <T>(item: T, index: number, arr: T[]): boolean => arr.indexOf(item) === index;
export const inAscOrder = (v1: number, v2: number) => v1 - v2;
export const pipe = (...fus: Function[]) => <T>(init: T) => fus.reduce((res, fn) => fn(res), init);
export const min = (arr: number[]): number => Math.min.apply(null, arr);
export const max = (arr: number[]): number => Math.max.apply(null, arr);

export const toMap = <T extends { id: any }>(items: readonly T[]): Map<T['id'], T> => (
  new Map(items.map((item) => [item.id, { ...item }]))
);

export const hasDiffParents = (node: Node): boolean => node.parents.map(prop('type')).filter(unique).length > 1;
export const byGender = (target: Gender) => (_: Node, b: Node) => (b.gender !== target) ? -1 : 1;

export const relToNode = (store: Store) => (rel: Relation) => store.getNode(rel.id);
export const withRelType = (...types: readonly Relation['type'][]) => (item: Relation) => types.includes(item.type);
