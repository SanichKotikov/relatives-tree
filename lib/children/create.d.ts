import type Store from '../store';
import { Family, FamilyType } from '../types';
export declare const createFamilyFunc: (store: Store) => (parentIDs: readonly string[], type?: FamilyType, isMain?: boolean) => Family;
