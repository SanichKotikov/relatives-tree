import Store from '../store';
import { Node, Unit } from '../types';
import { getSpouseNodesFunc } from './getSpouseNodesFunc';
import { newUnit } from './units';

const toArray = <T>(item: T): readonly T[] => Array.of(item);

export const createChildUnitsFunc = (store: Store) => {
  const getSpouseNodes = getSpouseNodesFunc(store);

  return (familyId: number, child: Node): readonly Unit[] => {
    const { left, middle, right } = getSpouseNodes([child]);

    return [...left.map(toArray), middle, ...right.map(toArray)]
      .map((nodes) => newUnit(familyId, nodes, true));
  };
};
