import { toMap, withId } from './utils';
import { Family, Node } from './types';

class Store {

  private nextId: number;

  families: Map<number, Family>;
  nodes: Map<string, Node>;

  root: Node;

  constructor(nodes: readonly Node[], rootId: string) {
    if (!nodes.find(withId(rootId))) throw new ReferenceError();

    this.nextId = 0;
    this.families = new Map();
    this.nodes = toMap(nodes);

    this.root = (this.nodes.get(rootId) as Node);
  }

  getNextId(): number { return ++this.nextId; }

  getNode(id: string): Node {
    return this.nodes.get(id) as Node;
  }

  getNodes(ids: readonly string[]): readonly Node[] {
    return ids.map(id => this.getNode(id));
  }

  getFamily(id: number): Family {
    return this.families.get(id) as Family;
  }

  get familiesArray(): readonly Family[] {
    return [...this.families.values()];
  }

}

export default Store;
