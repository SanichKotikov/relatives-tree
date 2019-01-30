import Family from './models/family';
import { IFamilyNode } from './types';

const ERROR_PREFIX = '[relatives-tree::store]:';

class Store {

  nextId: number;
  families: Map<number, Family>;
  nodes: Map<string, IFamilyNode>;
  rootNode: IFamilyNode;

  constructor(nodes: IFamilyNode[], rootId: string) {
    if (!nodes.find(node => node.id === rootId)) {
      throw new Error(`${ERROR_PREFIX} Can't find a root node with ID: ${rootId}`);
    }

    this.nextId = 1;
    this.families = new Map();
    this.nodes = new Map();

    nodes.forEach(node => this.nodes.set(node.id, { ...node }));
    this.rootNode = (this.nodes.get(rootId) as IFamilyNode);
  }

  get gender() {
    return this.rootNode.gender;
  }

  getNextId(): number {
    return this.nextId++;
  }

  getNode(id: string): IFamilyNode {
    const node = this.nodes.get(id);
    if (!node) throw new Error(`${ERROR_PREFIX} Can't find a node with ID: ${id}`);
    return node;
  }

  getNodes(ids: string[]): IFamilyNode[] {
    return ids.map(id => this.getNode(id));
  }

  getFamily(id: number): Family {
    const family = this.families.get(id);
    if (!family) throw new Error(`${ERROR_PREFIX} Can't find a family with ID: ${id}`);
    return family;
  }

}

export default Store;
