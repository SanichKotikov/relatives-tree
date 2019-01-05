import Store from '../store';
import { IRelation, IFamilyNode } from '../types';

const unique = (item: any, index: number, arr: any[]): boolean => arr.indexOf(item) === index;

const relToNode = (store: Store) => (rel: IRelation) => store.getNode(rel.id);

const hasDiffParents = (node: IFamilyNode): boolean =>
  node.parents.map(rel => rel.type).filter(unique).length > 1;

export {
  relToNode,
  hasDiffParents,
};
