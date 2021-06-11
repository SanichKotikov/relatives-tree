import type Store from '../store';
import { byGender, prop } from '../utils';
import { arrangeInOrder, newUnit } from '../utils/units';
import { newFamily } from '../utils/family';
import { Family, FamilyType, Unit } from '../types';

const getParentUnits = (store: Store, unit: Unit): readonly Unit[] => (
  unit.nodes.reduce<Unit[]>((units, child) => {
    const parents = store
      .getNodes(child.parents.map(prop('id')))
      .sort(byGender(store.root.gender));

    if (parents.length) units.push(newUnit(unit.fid, parents));
    return units;
  }, [])
);

const setDefaultUnitShift = (family: Family): void => {
  arrangeInOrder(family.children);
  arrangeInOrder(family.parents);
};

export const createFamilyFunc = (store: Store) => {
  return (childIDs: readonly string[]): Family => {
    const family = newFamily(store.getNextId(), FamilyType.parent);
    const childUnit = newUnit(family.id, store.getNodes(childIDs), true);

    family.children = [childUnit];
    family.parents = getParentUnits(store, childUnit);

    setDefaultUnitShift(family);
    return family;
  };
};
