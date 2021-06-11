import type Store from '../store';
import { hasDiffParents } from '../utils';
import { rightOf } from '../utils/family';
import type { Family } from '../types';
import { createBloodFamilies, createDiffTypeFamilies, createFamilyWithoutParents } from './create';

const arrangeFamilies = (families: readonly Family[]): void => {
  for (let i = 1; i < families.length; i++) {
    families[i]!.X = rightOf(families[i - 1]!);
  }
};

export const inMiddleDirection = (store: Store): Store => {
  const families = store.root.parents.length
    ? (hasDiffParents(store.root))
      ? createDiffTypeFamilies(store)
      : createBloodFamilies(store)
    : createFamilyWithoutParents(store);

  arrangeFamilies(families);
  families.forEach(family => store.families.set(family.id, family));

  return store;
};
