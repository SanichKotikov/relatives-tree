import Store from '../store';
import { Gender, RelationType, IRelation, IFamilyNode } from '../types';

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

export default (store: Store): Store => {
  if (store.rootNode.parents.length) return store;
  const root = store.rootNode;
  const parents = createParents(store, root);

  root.parents = parents.slice();
  root.siblings.forEach(rel => store.getNode(rel.id).parents = parents.slice());

  return store;
};
