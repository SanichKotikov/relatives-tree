import Family from './models/family';
import { IFamilyNode } from './types';

class Store {

  nextId: number;
  families: Map<number, Family>;
  nodes: Map<string, IFamilyNode>;
  rootNode: IFamilyNode;

  constructor(nodes: IFamilyNode[], rootId: string) {
    this.nextId = 1;
    this.families = new Map();
    this.nodes = new Map();

    nodes.forEach(node => this.nodes.set(node.id, node));

    // TODO:
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
    if (!node) throw new Error(`[family-tree-store]: can't find node with id: ${id}`);
    return node;
  }

  getNodes(ids: string[]): IFamilyNode[] {
    return [...ids].map(id => this.getNode(id));
  }

  getFamily(id: number): Family {
    const family = this.families.get(id);
    if (!family) throw new Error(`[family-tree-store]: can't find family with id: ${id}`);
    return family;
  }

}

export default Store;
