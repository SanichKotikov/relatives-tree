import type Store from '../store';
import type { Node, Unit } from '../types';
import { getSpouseNodesFunc } from './getSpouseNodesFunc';
import { newUnit } from './units';

const toArray = (nodes: readonly Node[]): readonly Node[][] => nodes.map(node => Array.of(node));

export const createChildUnitsFunc = (store: Store) => {
  const getSpouseNodes = getSpouseNodesFunc(store);

  return (familyId: number, child: Node): readonly Unit[] => {
    const { left, middle, right } = getSpouseNodes([child]);

    return [...toArray(left), middle, ...toArray(right)]
      .map((nodes) => newUnit(familyId, nodes, true));
  };
};
