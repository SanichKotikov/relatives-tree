import type Store from '../store';
import { NODES_IN_COUPLE } from '../constants';
import { Node, Relation, RelType } from '../types';
import { byGender, relToNode, withRelType } from './index';

type SpousesNodes = {
  left: readonly Node[];
  middle: readonly Node[];
  right: readonly Node[];
}

const inDescOrderOfChildCount = (a: Node, b: Node): number => (
  b.children.length - a.children.length
);

const getSpouse = (store: Store, spouses: readonly Relation[]): Node | undefined => {
  const toNode = relToNode(store);
  const married = spouses.find(withRelType(RelType.married));
  if (married) return toNode(married);
  if (spouses.length >= 1) return spouses.map(toNode).sort(inDescOrderOfChildCount)[0];
  return;
};

const getCoupleNodes = (store: Store, target: Node): readonly Node[] => {
  return [target, getSpouse(store, target.spouses)]
    .filter((node: unknown): node is Node => Boolean(node))
    .sort(byGender(store.root.gender));
};

const excludeRel = (target: Node) => (rel: Relation): boolean => rel.id !== target.id;

export const getSpouseNodesFunc = (store: Store) => {
  const toNode = relToNode(store);

  return (parents: readonly Node[]): SpousesNodes => {
    let middle: readonly Node[] = parents;

    if (middle.length !== NODES_IN_COUPLE)
      middle = getCoupleNodes(store, middle[0]!);

    const result: SpousesNodes = { left: [], middle, right: [] };

    if (middle.length === NODES_IN_COUPLE) {
      const [first, second] = middle as [Node, Node];
      result.left = first.spouses.filter(excludeRel(second)).map(toNode);
      result.right = second.spouses.filter(excludeRel(first)).map(toNode);
    }

    return result;
  };
};
