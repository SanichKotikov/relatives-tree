import Store from '../store';
import { prop, relToNode, withType } from './index';
import { IFamilyNode } from '../types';

interface ISpousesData {
  left: ReadonlyArray<IFamilyNode>;
  middle: ReadonlyArray<IFamilyNode>;
  right: ReadonlyArray<IFamilyNode>;
}

// In descending order of the number of children
const inDescChildren = (a: IFamilyNode, b: IFamilyNode) => {
  return b.children.length - a.children.length;
};

export default (store: Store, parents: ReadonlyArray<IFamilyNode>): ISpousesData => {
  const middle = [...parents];

  if (middle.length === 1) {
    const { gender, spouses } = middle[0];

    let spouse: IFamilyNode | undefined;
    const married = spouses.find(withType('married'));

    if (married) spouse = store.getNode(married!.id);
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
      .sort((a) => a.type === 'married' ? 1 : 0)
      .map(relToNode(store));

    result.right = middle[1].spouses
      .filter(rel => middleIds.indexOf(rel.id) === -1)
      .sort((a) => a.type === 'married' ? -1 : 0)
      .map(relToNode(store));
  }

  return result;
};
