import Store from '../store';
import { Node, Unit } from '../types';
import { getSpouses } from './getSpouses';
import { newUnit } from './units';

export const getChildUnits = (
  store: Store,
  familyId: number,
  child: Node,
): readonly Unit[] => {
  if (child.spouses.length) {
    const { left, middle, right } = getSpouses(store, [child]);
    return [...left.map(node => [node]), middle, ...right.map(node => [node])]
      .map(nodes => newUnit(familyId, nodes, true));
  }

  return [newUnit(familyId, [child], true)];
};
