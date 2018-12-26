import Store from '../store';
import { IFamilyNode } from '../types';

interface ISpousesData {
  left: IFamilyNode[];
  target: IFamilyNode[];
  right: IFamilyNode[];
}

export default (store: Store, parents: IFamilyNode[]): ISpousesData | null => {
  // TODO:

  if (!parents.length) return null;
  const parentNodes = [...parents];

  if (parentNodes.length === 1) {
    const parent = parentNodes[0];
    const currentSpouseLink = parent.spouses.find(link => link.type === 'married');

    if (currentSpouseLink) {
      const currentSpouse = store.getNode(currentSpouseLink.id);

      if (parent.gender === store.gender) {
        parentNodes.push(currentSpouse);
      } else {
        parentNodes.unshift(currentSpouse);
      }
    }
  }

  const result: ISpousesData = {
    left: [],
    target: parentNodes,
    right: [],
  };

  // That means we have to place both parents together
  // needs for my divorced parents
  if (parentNodes.length === 2) {
    // const together = isTogether(parents[0], parents[1]);

    // LEFT
    result.left = parentNodes[0].spouses
      .filter(link => !parentNodes.find(node => node.id === link.id))
      .sort((a, b) => a.type === 'married' ? 1 : 0)
      .map(link => store.getNode(link.id));

    // RIGHT
    result.right = parentNodes[1].spouses
      .filter(link => !parentNodes.find(node => node.id === link.id))
      .sort((a, b) => a.type !== 'married' ? 1 : 0)
      .map(link => store.getNode(link.id));
  } else {
    const parent = parentNodes[0];

    if (parent.gender === store.gender) {
      // [ ] =>
      result.right = parent.spouses
        .sort((a, b) => a.type !== 'married' ? 1 : 0)
        .map(link => store.getNode(link.id));
    } else {
      // <= [ ]
      result.left = parent.spouses
        .sort((a, b) => a.type === 'married' ? 1 : 0)
        .map(link => store.getNode(link.id));
    }
  }

  return result;
};