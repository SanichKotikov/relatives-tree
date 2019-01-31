import Store from '../store';
import Unit from '../models/unit';
import { IRelation, IFamilyNode } from '../types';

const prop = (name: string) => (item: any) => item[name];
const withId = (id: any) => (item: any) => item.id === id;
const withType = (...types: string[]) => (item: any) => types.includes(item.type);
const withSameIDs = (target: Unit) => (unit: Unit) => target.ids.join('') === unit.ids.join('');
const flat = (items: any[], item: any) => items.concat(item);
const unique = (item: any, index: number, arr: any[]): boolean => arr.indexOf(item) === index;
const inAscOrder = (v1: any, v2: any) => v1 - v2;
const pipe = (...fus: Function[]) => (init: any) => fus.reduce((res, fn) => fn(res), init);
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
