import type { Family, Node } from './types';
declare class Store {
    private nextId;
    families: Map<number, Family>;
    nodes: Map<string, Node>;
    root: Node;
    constructor(nodes: readonly Node[], rootId: string);
    getNextId(): number;
    getNode(id: string): Node;
    getNodes(ids: readonly string[]): Node[];
    getFamily(id: number): Family;
    get familiesArray(): readonly Family[];
    get rootFamilies(): readonly Family[];
    get rootFamily(): Family;
}
export default Store;
