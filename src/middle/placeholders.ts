import Store from '../store';
import { Gender, IFamilyNode, IRelation, RelationType } from '../types';
import { relToNode } from '../utils';

const createRel = (id: string, type = RelationType.blood): IRelation => ({ id, type });

const createNode = (gender: Gender): IFamilyNode => ({
  id: `${gender}-ph`,
  placeholder: true,
  gender: gender,
  parents: [],
  siblings: [],
  spouses: [],
  children: [],
});

const createParents = (store: Store): IRelation[] => {
  const father = createNode(Gender.male);
  const mother = createNode(Gender.female);

  father.spouses = [createRel(mother.id, RelationType.married)];
  mother.spouses = [createRel(father.id, RelationType.married)];

  const { id, siblings } = store.root;

  return [father, mother].map(node => {
    node.children = siblings.concat(createRel(id));
    store.nodes.set(node.id, node);

    return createRel(node.id);
  });
};

const setParents = (parents: IRelation[]) => {
  return (node: IFamilyNode) => node.parents = parents.slice();
};

export default (store: Store): Store => {
  if (store.root.parents.length) return store;
  const setParentsTo = setParents(createParents(store));

  setParentsTo(store.root);

  store.root.siblings
    .map(relToNode(store))
    .forEach(setParentsTo);

  return store;
};
