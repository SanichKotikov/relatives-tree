import Store from '../store';
import { Node, Relation, RelType } from '../types';
import { byGender, relToNode, withRelType } from './index';

const NODES_IN_COUPLE = 2;

type ISpousesData = {
  left: readonly Node[];
  middle: readonly Node[];
  right: readonly Node[];
}

const inDescOrderOfChildCount = (a: Node, b: Node): number => (
  b.children.length - a.children.length
);

const getSpouse = (store: Store, spouses: readonly Relation[]): Node | undefined => {
  const married = spouses.find(withRelType(RelType.married));
  if (married) return store.getNode(married.id);
  if (spouses.length >= 1)
    return spouses
      .map(relToNode(store))
      .sort(inDescOrderOfChildCount)[0];
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

  return (parents: readonly Node[]): ISpousesData => {
    let middle: readonly Node[] = parents;

    if (middle.length !== NODES_IN_COUPLE)
      middle = getCoupleNodes(store, middle[0]);

    const result: ISpousesData = { left: [], middle, right: [] };

    if (middle.length === NODES_IN_COUPLE) {
      const [first, second] = middle;
      result.left = first.spouses.filter(excludeRel(second)).map(toNode);
      result.right = second.spouses.filter(excludeRel(first)).map(toNode);
    }

    return result;
  };
};
