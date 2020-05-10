import Store from '../store';
import Unit from '../models/unit';
import getSpouses from '../utils/getSpouses';
import { IFamilyNode } from '../types';

function getChildUnits(store: Store, familyId: number, child: IFamilyNode): ReadonlyArray<Unit> {
  if (child.spouses.length) {
    const { left, middle, right } = getSpouses(store, [child]);
    return [...left.map(node => [node]), middle, ...right.map(node => [node])]
      .map(nodes => new Unit(familyId, nodes, true));
  }

  return [new Unit(familyId, [child], true)];
}

export default getChildUnits;
