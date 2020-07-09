import Store from '../store';
import Unit from '../models/unit';
import { Gender, IFamilyNode, IRelation } from '../types';

export const prop = <T, K extends keyof T>(name: K) => (item: T): T[K] => item[name];
export const withId = <T extends { id: any; }, K extends keyof { id: any; }>(id: T[K]) => (item: T) => item.id === id;
export const withType = <T extends { type: string; }>(...types: string[]) => (item: T) => types.includes(item.type);
export const withSameIDs = (target: Unit) => (unit: Unit) => target.ids.join('') === unit.ids.join('');
export const flat = <T>(items: ReadonlyArray<T>, item: ReadonlyArray<T>) => items.concat(item);
export const unique = <T>(item: T, index: number, arr: T[]): boolean => arr.indexOf(item) === index;
export const inAscOrder = (v1: number, v2: number) => v1 - v2;
export const pipe = (...fus: Function[]) => <T>(init: T) => fus.reduce((res, fn) => fn(res), init);
export const relToNode = (store: Store) => (rel: IRelation) => store.getNode(rel.id);
export const min = (arr: number[]): number => Math.min.apply(null, arr);
export const max = (arr: number[]): number => Math.max.apply(null, arr);

export function toMap<T extends { id: any }>(items: ReadonlyArray<T>): Map<T['id'], T> {
  return new Map(items.map((item) => [item.id, { ...item }]));
}

export function hasDiffParents(node: IFamilyNode): boolean {
  return node.parents.map(prop('type')).filter(unique).length > 1;
}

export function byGender(target: Gender) {
  return (a: IFamilyNode, b: IFamilyNode) => (b.gender !== target) ? -1 : 0;
}
