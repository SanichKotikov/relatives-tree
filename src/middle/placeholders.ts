import Store from '../store';
import { IFamilyNode } from '../types';

// TODO:
export default (store: Store): void => {
  if (store.rootNode.parents.length) return;

  const father: IFamilyNode = {
    id: 'father-placeholder',
    placeholder: true,
    gender: 'male',
    parents: [],
    siblings: [],
    spouses: [
      { id: 'mother-placeholder', type: 'married' },
    ],
    children: [
      { id: store.rootNode.id, type: 'blood' },
      ...store.rootNode.siblings,
    ],
  };

  const mother: IFamilyNode = {
    id: 'mother-placeholder',
    placeholder: true,
    gender: 'female',
    parents: [],
    siblings: [],
    spouses: [
      { id: 'father-placeholder', type: 'married' },
    ],
    children: [
      { id: store.rootNode.id, type: 'blood' },
      ...store.rootNode.siblings,
    ],
  };

  store.rootNode.parents = [
    { id: father.id, type: 'blood' },
    { id: mother.id, type: 'blood' },
  ];

  store.rootNode.siblings.forEach(link => {
    const sibling = store.getNode(link.id);
    sibling.parents = store.rootNode.parents;
  });

  store.nodes.set(father.id, father);
  store.nodes.set(mother.id, mother);
};
