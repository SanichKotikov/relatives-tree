import Store from '../store';
import { Gender, RelationType, IRelation, IFamilyNode } from '../types';
import { relToNode } from '../utils';

const createRel = (id: string, type: RelationType = 'blood'): IRelation => ({ id, type });

const createNode = (gender: Gender): IFamilyNode => ({
  id: `${gender}-placeholder`,
  placeholder: true,
  gender: gender,
  parents: [],
  siblings: [],
  spouses: [],
  children: [],
});

const createParents = (store: Store, root: IFamilyNode): IRelation[] => {
  const father = createNode('male');
  const mother = createNode('female');

  father.spouses = [createRel(mother.id, 'married')];
  mother.spouses = [createRel(father.id, 'married')];

  return [father, mother].map(node => {
    node.children = root.siblings.concat(createRel(root.id));
    store.nodes.set(node.id, node);

    return createRel(node.id);
  });
};

const setParents = (parents: IRelation[]) => (node: IFamilyNode) => node.parents = parents.slice();

export default (store: Store): Store => {
  if (store.rootNode.parents.length) return store;
  const root = store.rootNode;
  const setParentsTo = setParents(createParents(store, root));

  setParentsTo(root);

  root.siblings
    .map(relToNode(store))
    .forEach(setParentsTo);

  return store;
};
