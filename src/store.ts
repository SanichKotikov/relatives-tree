import Family from './models/family';
import { withId } from './utils';
import { Gender, IFamilyNode } from './types';

const ERROR_PREFIX = '[relatives-tree::store]:';

const mapNode = (node: IFamilyNode): [string, IFamilyNode] => [node.id, { ...node }];

class Store {

  nextId: number;
  families: Map<number, Family>;
  nodes: Map<string, IFamilyNode>;

  rootNode: IFamilyNode;
  gender: Gender;

  constructor(nodes: IFamilyNode[], rootId: string) {
    if (!nodes.find(withId(rootId))) {
      throw new Error(`${ERROR_PREFIX} Can't find a root node with ID: ${rootId}`);
    }

    this.nextId = 0;
    this.families = new Map();
    this.nodes = new Map(nodes.map(mapNode));

    this.rootNode = (this.nodes.get(rootId) as IFamilyNode);
    this.gender = this.rootNode.gender;
  }

  getNextId(): number { return ++this.nextId; }

  getNode(id: string): IFamilyNode { return this.nodes.get(id) as IFamilyNode; }
  getNodes(ids: string[]): IFamilyNode[] { return ids.map(this.getNode.bind(this)); }
  getFamily(id: number): Family { return this.families.get(id) as Family; }

  get familiesArray(): Family[] { return [...this.families.values()] }

}

export default Store;
