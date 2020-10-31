import { toMap, withId } from './utils';
import { Family, IFamilyNode } from './types';

class Store {

  private nextId: number;

  families: Map<number, Family>;
  nodes: Map<string, IFamilyNode>;

  root: IFamilyNode;

  constructor(nodes: ReadonlyArray<Readonly<IFamilyNode>>, rootId: string) {
    if (!nodes.find(withId(rootId))) throw new ReferenceError();

    this.nextId = 0;
    this.families = new Map();
    this.nodes = toMap(nodes);

    this.root = (this.nodes.get(rootId) as IFamilyNode);
  }

  getNextId(): number { return ++this.nextId; }

  getNode(id: string): IFamilyNode {
    return this.nodes.get(id) as IFamilyNode;
  }

  getNodes(ids: ReadonlyArray<string>): ReadonlyArray<IFamilyNode> {
    return ids.map(id => this.getNode(id));
  }

  getFamily(id: number): Family {
    return this.families.get(id) as Family;
  }

  get familiesArray(): ReadonlyArray<Family> {
    return [...this.families.values()];
  }

}

export default Store;
