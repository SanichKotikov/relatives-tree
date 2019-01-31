import Store from '../store';
import Unit from '../models/unit';
import { IRelation, IFamilyNode } from '../types';

const withId = (id: any) => (item: any) => item.id === id;
const withType = (...types: string[]) => (item: any) => types.includes(item.type);
const withSameIDs = (target: Unit) => (unit: Unit) => target.ids.join('') === unit.ids.join('');
const flat = (items: any[], item: any) => items.concat(item);
const unique = (item: any, index: number, arr: any[]): boolean => arr.indexOf(item) === index;

const pipe = (...fus: Function[]) => (init: any) => fus.reduce((res, fn) => fn(res), init);

const relToNode = (store: Store) => (rel: IRelation) => store.getNode(rel.id);
const itemToID = (item: any) => item.id;

const hasDiffParents = (node: IFamilyNode): boolean =>
  node.parents.map(rel => rel.type).filter(unique).length > 1;

export {
  withId,
  withType,
  withSameIDs,
  flat,
  pipe,
  relToNode,
  itemToID,
  hasDiffParents,
};
