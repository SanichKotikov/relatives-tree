import Store from '../store';
import { prop, withType, relToNode } from './index';
import { IFamilyNode } from '../types';

interface ISpousesData {
  left: IFamilyNode[];
  middle: IFamilyNode[];
  right: IFamilyNode[];
}

export default (store: Store, parents: IFamilyNode[]): ISpousesData => {
  const middle = [...parents];

  if (middle.length === 1) {
    let spouse: IFamilyNode | undefined;

    const parent = middle[0];
    const married = parent.spouses.find(withType('married'));

    if (married) {
      spouse = store.getNode(married.id);
    } else if (parent.spouses.length === 1) {
      spouse = store.getNode(parent.spouses[0].id)
    } else if (parent.spouses.length > 1) {
      spouse = (
        parent.spouses
          .map(relToNode(store))
          .sort((a, b) => b.children.length - a.children.length)
      )[0];
    }

    if (spouse) {
      parent.gender === store.gender
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