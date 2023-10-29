import type Store from '../store';
import { Family } from '../types';
export declare const createFamilyWithoutParents: (store: Store) => readonly Family[];
export declare const createDiffTypeFamilies: (store: Store) => readonly Family[];
export declare const createBloodFamilies: (store: Store) => readonly Family[];
