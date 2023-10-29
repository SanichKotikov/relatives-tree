import type Store from '../store';
import type { Node, Unit } from '../types';
export declare const createChildUnitsFunc: (store: Store) => (familyId: number, child: Node) => readonly Unit[];
