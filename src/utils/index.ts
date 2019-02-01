import Store from '../store';
import Unit from '../models/unit';
import { IRelation, IFamilyNode } from '../types';

const prop = <T, K extends keyof T>(name: K) => (item: T): T[K] => item[name];
const withId = <T extends { id: any; }, K extends keyof { id: any; }>(id: T[K]) => (item: T) => item.id === id;
const withType = <T extends { type: string; }>(...types: string[]) => (item: T) => types.includes(item.type);
const withSameIDs = (target: Unit) => (unit: Unit) => target.ids.join('') === unit.ids.join('');
const flat = <T>(items: T[], item: T[]) => items.concat(item);
const unique = <T>(item: T, index: number, arr: T[]): boolean => arr.indexOf(item) === index;
const inAscOrder = (v1: number, v2: number) => v1 - v2;
const pipe = (...fus: Function[]) => <T>(init: T) => fus.reduce((res, fn) => fn(res), init);
const relToNode = (store: Store) => (rel: IRelation) => store.getNode(rel.id);
const min = (arr: number[]): number => Math.min.apply(null, arr);
const max = (arr: number[]): number => Math.max.apply(null, arr);

const hasDiffParents = (node: IFamilyNode): boolean =>
  node.parents.map(prop('type')).filter(unique).length > 1;

export {
  prop,
  withId,
  withType,
  withSameIDs,
  flat,
  unique,
  inAscOrder,
  pipe,
  relToNode,
  min,
  max,
  hasDiffParents,
};
