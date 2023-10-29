import type Store from '../store';
import { Node } from '../types';
type SpousesNodes = {
    left: readonly Node[];
    middle: readonly Node[];
    right: readonly Node[];
};
export declare const getSpouseNodesFunc: (store: Store) => (parents: readonly Node[]) => SpousesNodes;
export {};
