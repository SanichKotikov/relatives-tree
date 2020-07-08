import Family from '../models/family';
import Unit from '../models/unit';
import { IFamilyNode } from '../types';
import { withId } from './index';

function inUnits(units: ReadonlyArray<Unit>, nodeId: string) {
  return !!units.find(unit => !!unit.nodes.find(withId(nodeId)));
}

export default (family: Family, node: IFamilyNode): boolean => {
  if (family.type !== 'child' && inUnits(family.pUnits, node.id)) {
    return (
      (family.type === 'parent' && (node.children.length > 1 || node.spouses.length > 1)) ||
      (!node.parents.length && !!node.siblings.length)
    );
  }

  if (family.type !== 'parent' && inUnits(family.cUnits, node.id)) {
    const parentIds = family.pUnits.length ? family.pUnits[0].ids : [];
    // TODO
    const sameParents = !!node.parents.filter(rel => parentIds.includes(rel.id)).length;
    return (!sameParents && (!!node.parents.length || !!node.siblings.length));
  }

  return false;
};
