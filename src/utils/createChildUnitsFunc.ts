import Store from '../store';
import { Node, Unit } from '../types';
import { getSpouses } from './getSpouses';
import { newUnit } from './units';

const toArray = <T>(item: T): readonly T[] => Array.of(item);

export const createChildUnitsFunc = (store: Store) => (
  (familyId: number, child: Node): readonly Unit[] => {
    const { left, middle, right } = getSpouses(store, [child]);

    return [...left.map(toArray), middle, ...right.map(toArray)]
      .map((nodes) => newUnit(familyId, nodes, true));
  }
);
