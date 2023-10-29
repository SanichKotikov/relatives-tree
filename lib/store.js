import { toMap, withId } from './utils';
import { withType } from './utils/family';
import { FamilyType } from './types';
class Store {
    constructor(nodes, rootId) {
        if (!nodes.find(withId(rootId)))
            throw new ReferenceError();
        this.nextId = 0;
        this.families = new Map();
        this.nodes = toMap(nodes);
        this.root = this.nodes.get(rootId);
    }
    getNextId() {
        return ++this.nextId;
    }
    getNode(id) {
        return this.nodes.get(id);
    }
    getNodes(ids) {
        return ids.map((id) => this.getNode(id));
    }
    getFamily(id) {
        return this.families.get(id);
    }
    get familiesArray() {
        return [...this.families.values()];
    }
    get rootFamilies() {
        return this.familiesArray.filter(withType(FamilyType.root));
    }
    get rootFamily() {
        return this.rootFamilies.find((family) => family.main);
    }
}
export default Store;
