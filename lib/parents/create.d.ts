import type Store from '../store';
import { Family } from '../types';
export declare const createFamilyFunc: (store: Store) => (childIDs: readonly string[]) => Family;
