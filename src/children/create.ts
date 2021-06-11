import type Store from '../store';
import { byGender, relToNode, withId } from '../utils';
import { newUnit } from '../utils/units';
import { newFamily } from '../utils/family';
import { setDefaultUnitShift } from '../utils/setDefaultUnitShift';
import { createChildUnitsFunc } from '../utils/createChildUnitsFunc';
import { Family, FamilyType, Node, Relation, Unit } from '../types';

const hasSameRelation = (node: Node | undefined) => (
  (rel: Relation): boolean => !node || node.children.some(withId(rel.id))
);

const getChildUnitsFunc = (store: Store) => {
  const toNode = relToNode(store);
  const createChildUnits = createChildUnitsFunc(store);

  return (familyId: number, parents: readonly Node[]): readonly Unit[] => {
    const [first, second] = parents as [Node, Node | undefined];

    return first.children
      .filter(hasSameRelation(second))
      .flatMap((rel) => createChildUnits(familyId, toNode(rel)));
  };
};

export const createFamilyFunc = (store: Store) => {
  const getChildUnits = getChildUnitsFunc(store);

  return (parentIDs: readonly string[], type = FamilyType.root, isMain: boolean = false): Family => {
    const family = newFamily(store.getNextId(), type, isMain);

    const parents: Node[] = parentIDs
      .map(id => store.getNode(id))
      .sort(byGender(store.root.gender));

    family.parents = [newUnit(family.id, parents)];
    family.children = getChildUnits(family.id, parents);

    setDefaultUnitShift(family);
    return family;
  };
};
