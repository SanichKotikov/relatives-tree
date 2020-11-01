import Store from '../store';
import { getSpouses } from '../utils/getSpouses';
import { newUnit } from '../utils/units';
import { IFamilyNode, Unit } from '../types';

export const getChildUnits = (
  store: Store,
  familyId: number,
  child: IFamilyNode,
): ReadonlyArray<Unit> => {
  if (child.spouses.length) {
    const { left, middle, right } = getSpouses(store, [child]);
    return [...left.map(node => [node]), middle, ...right.map(node => [node])]
      .map(nodes => newUnit(familyId, nodes, true));
  }

  return [newUnit(familyId, [child], true)];
};
