import { toMap, withId } from './utils';
import { withType } from './utils/family';
import type { Family, Node } from './types';
import { FamilyType } from './types';

// TODO think about refactoring
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

    this.root = (this.nodes.get(rootId)!);
  }

  getNextId(): number { return ++this.nextId; }

  getNode(id: string): Node {
    return this.nodes.get(id)!;
  }

  getNodes(ids: readonly string[]): Node[] {
    return ids.map(id => this.getNode(id));
  }

  getFamily(id: number): Family {
    return this.families.get(id)!;
  }

  get familiesArray(): readonly Family[] {
    return [...this.families.values()];
  }

  get rootFamilies(): readonly Family[] {
    return this.familiesArray.filter(withType(FamilyType.root));
  }

  get rootFamily(): Family {
    return this.rootFamilies.find(family => family.main)!;
  }

}

export default Store;
