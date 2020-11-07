import Store from '../store';
import { prop, relToNode, withRelType } from './index';
import { Node, RelType } from '../types';

type ISpousesData = {
  left: readonly Node[];
  middle: readonly Node[];
  right: readonly Node[];
}

// In descending order of the number of children
const inDescChildren = (a: Node, b: Node) => {
  return b.children.length - a.children.length;
};

export const getSpouseNodesFunc = (store: Store) => (
  (parents: readonly Node[]): ISpousesData => {
    const middle = [...parents];

    if (middle.length === 1) {
      const { gender, spouses } = middle[0];

      let spouse: Node | undefined;
      const married = spouses.find(withRelType(RelType.married));

      if (married) spouse = store.getNode(married.id);
      else if (spouses.length === 1) spouse = store.getNode(spouses[0].id);
      else if (spouses.length > 1) spouse = spouses.map(relToNode(store)).sort(inDescChildren)[0];

      if (spouse) {
        gender === store.root.gender
          ? middle.push(spouse)
          : middle.unshift(spouse);
      }
    }

    const result: ISpousesData = { left: [], middle, right: [] };

    if (middle.length === 2) {
      const middleIds = result.middle.map(prop('id'));

      result.left = middle[0].spouses
        .filter(rel => middleIds.indexOf(rel.id) === -1)
        .sort((a) => a.type === RelType.married ? 1 : 0)
        .map(relToNode(store));

      result.right = middle[1].spouses
        .filter(rel => middleIds.indexOf(rel.id) === -1)
        .sort((a) => a.type === RelType.married ? -1 : 0)
        .map(relToNode(store));
    }

    return result;
  }
);
